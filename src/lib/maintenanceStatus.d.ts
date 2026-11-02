// Types for maintenanceStatus.js (kept as JS so `node --test` runs it without a build).
export interface MaintenanceStatus {
  maintenance: boolean;
  message: string;
  until: string;
}
export const STATUS_URL: string;
export const CLOSED_STATUS: Readonly<MaintenanceStatus>;
export function normalizeStatus(raw: unknown): MaintenanceStatus;
export function fetchMaintenanceStatus(
  url?: string,
  fetchImpl?: typeof fetch,
): Promise<MaintenanceStatus>;
