/**
 * Configuration options for the logger
 */
export interface LoggerConfig {
  /**
   * Enable or disable logging
   * @default true in development, false in production
   */
  enabled?: boolean;

  /**
   * Show timestamp in logs
   * @default false
   */
  showTimestamp?: boolean;
}

/**
 * Runtime environment type
 */
export type RuntimeEnvironment = 'node' | 'browser';

/**
 * Log level type
 */
export type LogLevel = 'success' | 'error' | 'warn' | 'info';
