/**
 * Validates that all required environment variables are set
 */
export function validateEnv() {
  const required = ["DATABASE_URL", "ADMIN_PASSWORD", "OPENAI_API_KEY"];
  const missing: string[] = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(", ")}`;
    console.error(`[ENV] ${message}`);
    throw new Error(message);
  }

  console.log("[ENV] All required environment variables are configured");
}

/**
 * Get environment variable with fallback
 */
export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  
  return value || defaultValue || "";
}

/**
 * Check if running in production
 */
export const isProduction = process.env.NODE_ENV === "production";

/**
 * Check if running in development
 */
export const isDevelopment = process.env.NODE_ENV === "development";
