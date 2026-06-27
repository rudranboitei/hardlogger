import { logger } from './logger.js';
import type { LoggerConfig } from './types.js';

/**
 * Public interface for Hardlogger
 */
export interface Hardlogger {
  /**
   * Log a success message
   */
  success(...args: unknown[]): void;

  /**
   * Log an error message
   */
  error(...args: unknown[]): void;

  /**
   * Log a warning message
   */
  warn(...args: unknown[]): void;

  /**
   * Log an info message
   */
  info(...args: unknown[]): void;

  /**
   * Configure logger options
   */
  config(options: LoggerConfig): Hardlogger;
}

/**
 * Log a success message
 */
export const success = (...args: unknown[]): void => logger.success(...args);

/**
 * Log an error message
 */
export const error = (...args: unknown[]): void => logger.error(...args);

/**
 * Log a warning message
 */
export const warn = (...args: unknown[]): void => logger.warn(...args);

/**
 * Log an info message
 */
export const info = (...args: unknown[]): void => logger.info(...args);

/**
 * Configure logger options
 */
export const config = (options: LoggerConfig): Hardlogger => {
  logger.configure(options);
  return log;
};

/**
 * Dev-only logger with beautiful, colorful output
 * 
 * Automatically detects Node.js or Browser environment and applies appropriate styling.
 * Disabled by default in production (NODE_ENV === 'production').
 * 
 * @example
 * ```ts
 * import log from 'hardlog';
 * 
 * log.success('Server started successfully!');
 * log.error('Database connection failed');
 * log.warn('Missing environment variable');
 * log.info('Listening on port 3000');
 * 
 * // Multiple arguments support
 * log.info('User Object:', userData);
 * log.success('Status:', status, 'Code:', code);
 * ```
 * 
 * @example
 * ```ts
 * // Configure logger
 * import log from 'hardlog';
 * 
 * log.config({ enabled: true, showTimestamp: true });
 * ```
 */
const log: Hardlogger = {
  success,
  error,
  warn,
  info,
  config,
};

export default log;
export type { LoggerConfig };

