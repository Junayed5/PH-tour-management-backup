import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  BCRYPT_SALT_ROUNDS: string;
  JWT_ACCESS_EXPIRY: string;
  JWT_SECRET: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_EXPIRY: string;
  JWT_REFRESH_SECRET: string;
}

const loadEnvVarialbles = (): EnvConfig => {
  const requireEnvVarialble: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "BCRYPT_SALT_ROUNDS",
    "JWT_ACCESS_EXPIRY",
    "JWT_SECRET",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_EXPIRY",
    "JWT_REFRESH_EXPIRY"
  ];

  requireEnvVarialble.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require env ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URL: process.env.DB_URL!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY as string,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY as string,
  };
};

export const envVars = loadEnvVarialbles();
