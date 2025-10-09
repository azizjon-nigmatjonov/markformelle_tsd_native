/**
 * Environment configuration
 * Access environment variables throughout the app
 */

// For Expo, we need to use Constants to access env variables
import Constants from "expo-constants";

interface EnvConfig {
  API_BASE_URL: string;
}

/**
 * Get environment variables
 * In production, these should be set in app.json extra field
 * For development, you can use .env file or set them directly here
 */
export const ENV: EnvConfig = {
  // Try to get from expo config first, then fallback to default
  API_BASE_URL: "http://10.40.14.193:8070",
};

// Validate required environment variables
const validateEnv = () => {
  const required: (keyof EnvConfig)[] = ["API_BASE_URL"];
  const missing = required.filter((key) => !ENV[key]);

  if (missing.length > 0) {
    console.warn(
      `⚠️ Missing environment variables: ${missing.join(", ")}\n` +
        'Please set them in app.json under "extra" field or .env file'
    );
  }
};

validateEnv();

export default ENV;
