// 📝 Logging utility for consistent logging across the application
// Used for development debugging and monitoring

type LogLevel = 'info' | 'warn' | 'error' | 'debug'
type LogData = unknown[] // 🔒 Type-safe alternative to any[]

const LOG_LEVELS: Record<LogLevel, string> = {
  info: '🟢',
  warn: '⚠️',
  error: '🔴',
  debug: '🔍'
}

/**
 * 📊 Application logger
 * Provides consistent logging with emoji indicators and environment awareness
 */
export const logger = {
  info: (message: string, ...args: LogData) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`${LOG_LEVELS.info} ${message}`, ...args)
    }
  },
  warn: (message: string, ...args: LogData) => {
    console.warn(`${LOG_LEVELS.warn} ${message}`, ...args)
  },
  error: (message: string, ...args: LogData) => {
    console.error(`${LOG_LEVELS.error} ${message}`, ...args)
  },
  debug: (message: string, ...args: LogData) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(`${LOG_LEVELS.debug} ${message}`, ...args)
    }
  }
} 