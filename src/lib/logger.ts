/**
 * Simple logging utility for the application
 */

type LogLevel = "DEBUG" | "INFO" | "WARN" | "ERROR";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
}

function formatLog(entry: LogEntry): string {
  const { timestamp, level, message, data } = entry;
  const timestamp_str = new Date(timestamp).toISOString();
  const data_str = data ? ` | ${JSON.stringify(data)}` : "";
  return `[${timestamp_str}] [${level}] ${message}${data_str}`;
}

export const logger = {
  debug(message: string, data?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "DEBUG",
      message,
      data,
    };
    console.debug(formatLog(entry));
  },

  info(message: string, data?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "INFO",
      message,
      data,
    };
    console.log(formatLog(entry));
  },

  warn(message: string, data?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "WARN",
      message,
      data,
    };
    console.warn(formatLog(entry));
  },

  error(message: string, data?: unknown) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: "ERROR",
      message,
      data,
    };
    console.error(formatLog(entry));
  },
};
