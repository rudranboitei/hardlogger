import type { LoggerConfig, LogLevel, RuntimeEnvironment } from './types.js';
import { detectEnvironment, shouldLogByDefault } from './env.js';

/**
 * ANSI color codes for Node.js terminal
 */
const ANSI_COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
} as const;

/**
 * CSS styles for browser console
 */
const BROWSER_STYLES = {
  success: 'background: #10b981; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  error: 'background: #ef4444; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  warn: 'background: #f59e0b; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
  info: 'background: #3b82f6; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
} as const;

/**
 * Log level symbols and labels
 */
const LOG_CONFIG = {
  success: { symbol: '✅', label: 'SUCCESS', color: ANSI_COLORS.green },
  error: { symbol: '❌', label: 'ERROR', color: ANSI_COLORS.red },
  warn: { symbol: '⚠', label: 'WARNING', color: ANSI_COLORS.yellow },
  info: { symbol: '💡', label: 'INFO', color: ANSI_COLORS.blue },
} as const;

/**
 * Console method mapping for each log level to ensure proper stream output
 */
const CONSOLE_METHODS = {
  success: 'log',
  error: 'error',
  warn: 'warn',
  info: 'info',
} as const;

/**
 * Logger class - handles all logging operations
 */
class Logger {
  private config: Required<LoggerConfig>;
  private runtime: RuntimeEnvironment;

  constructor() {
    this.runtime = detectEnvironment();
    this.config = {
      enabled: shouldLogByDefault(),
      showTimestamp: false,
    };
  }

  /**
   * Configure logger options
   */
  public configure(options: LoggerConfig): this {
    try {
      if (options.enabled !== undefined) {
        this.config.enabled = options.enabled;
      }
      if (options.showTimestamp !== undefined) {
        this.config.showTimestamp = options.showTimestamp;
      }
    } catch {
      // Fail silently
    }
    return this;
  }

  /**
   * Get current timestamp string
   */
  private getTimestamp(): string {
    try {
      const now = new Date();
      return `[${now.toLocaleTimeString()}]`;
    } catch {
      return '';
    }
  }

  /**
   * Log message in Node.js with ANSI colors
   */
  private logNode(level: LogLevel, ...args: unknown[]): void {
    try {
      const cfg = LOG_CONFIG[level];
      const timestamp = this.config.showTimestamp ? `${this.getTimestamp()} ` : '';
      const prefix = `${cfg.color}${cfg.symbol} ${cfg.label.padEnd(10)}${ANSI_COLORS.reset} ${timestamp}`;
      const method = CONSOLE_METHODS[level];
      
      console[method](prefix, ...args);
    } catch {
      // Fail silently
    }
  }

  /**
   * Log message in browser with CSS styling
   */
  private logBrowser(level: LogLevel, ...args: unknown[]): void {
    try {
      const cfg = LOG_CONFIG[level];
      const timestamp = this.config.showTimestamp ? `${this.getTimestamp()} ` : '';
      const label = `${cfg.symbol} ${cfg.label}`;
      const method = CONSOLE_METHODS[level];
      
      console[method](`%c${label}%c ${timestamp}`, BROWSER_STYLES[level], '', ...args);
    } catch {
      // Fail silently
    }
  }

  /**
   * Core log method - routes to appropriate handler
   */
  private log(level: LogLevel, ...args: unknown[]): void {
    // Don't log if disabled
    if (!this.config.enabled) {
      return;
    }

    try {
      if (this.runtime === 'node') {
        this.logNode(level, ...args);
      } else {
        this.logBrowser(level, ...args);
      }
    } catch {
      // Fail silently - never break user's app
    }
  }

  /**
   * Log success message
   */
  public success(...args: unknown[]): void {
    this.log('success', ...args);
  }

  /**
   * Log error message
   */
  public error(...args: unknown[]): void {
    this.log('error', ...args);
  }

  /**
   * Log warning message
   */
  public warn(...args: unknown[]): void {
    this.log('warn', ...args);
  }

  /**
   * Log info message
   */
  public info(...args: unknown[]): void {
    this.log('info', ...args);
  }
}

/**
 * Singleton logger instance
 */
export const logger = new Logger();
