import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';

/**
 * Serves the /api functions during `npm run dev`.
 *
 * In production Vercel runs `api/*.ts` for us; the plain Vite dev server knows
 * nothing about /api, so without this every form 404s locally. This mounts the
 * very same handler file, so there's no second implementation to keep in sync.
 */
function apiDevServer(): Plugin {
  return {
    name: 'api-dev-server',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        try {
          // Vercel parses the JSON body for us in production; Vite does not.
          const raw = await new Promise<string>((resolve, reject) => {
            let data = '';
            req.on('data', (chunk) => {
              data += chunk;
              if (data.length > 1_000_000) reject(new Error('Body too large'));
            });
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });

          const shimReq = req as IncomingMessage & { body?: unknown };
          shimReq.body = raw ? JSON.parse(raw) : {};

          // Shim the two response helpers the handler relies on.
          const shimRes = res as ServerResponse & {
            status?: (code: number) => typeof shimRes;
            json?: (payload: unknown) => void;
          };
          shimRes.status = (code: number) => {
            shimRes.statusCode = code;
            return shimRes;
          };
          shimRes.json = (payload: unknown) => {
            shimRes.setHeader('Content-Type', 'application/json');
            shimRes.end(JSON.stringify(payload));
          };

          // ssrLoadModule handles the TS/ESM transform for us.
          const mod = await server.ssrLoadModule('/api/contact.ts');
          await mod.default(shimReq, shimRes);
        } catch (err) {
          server.config.logger.error(`[api-dev-server] ${String(err)}`);
          if (!res.writableEnded) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Local API error' }));
          }
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Empty prefix loads every var (not just VITE_*) so the dev API handler can
  // read RESEND_API_KEY. These go onto process.env only — Vite still exposes
  // just VITE_* to client code, so the key never reaches the browser bundle.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
    plugins: [react(), apiDevServer()],
    base: '/',
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
