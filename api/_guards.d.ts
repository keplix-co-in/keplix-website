// Types for _guards.js (kept as JS so `node --test` runs it without a build).
export type ChatMsg = { role: 'user' | 'assistant'; content: string };

export function clientIp(headers: Record<string, string | string[] | undefined> | undefined): string;

export interface RateLimiter {
  hit(key: string, now?: number): 'minute' | 'day' | null;
}
export function createRateLimiter(opts: { perMinute: number; perDay: number; maxKeys?: number }): RateLimiter;

export interface DailyCap {
  take(now?: number): boolean;
}
export function createDailyCap(limit: number): DailyCap;

export function sanitizeChatText(text: string): string;
export function buildChatMessages(
  raw: unknown,
  opts?: {
    maxRaw?: number;
    maxTotalChars?: number;
    maxUserTurns?: number;
    maxChars?: number;
    maxTurns?: number;
    maxAssistantChars?: number;
    verifyAssistant?: (content: string, sig: unknown) => boolean;
  },
): ChatMsg[] | null;
export function normalizeForMatch(text: string): string;
export function containsLeak(reply: string, markers: readonly string[]): boolean;

export function pickAllowedFields(
  rawFields: unknown,
  labels: Record<string, string>,
  limits?: Record<string, number>,
  defaultMax?: number,
): Array<readonly [string, string]> | null;
export function checkFillTime(fillMs: unknown, minMs: number): 'missing' | 'too-fast' | 'ok';
export function replySigningKey(env: Record<string, string | undefined>): Buffer | null;
export function signReply(key: Buffer, content: string, now?: number): string;
export function verifyReply(key: Buffer | null, content: string, sig: unknown, now?: number): boolean;
