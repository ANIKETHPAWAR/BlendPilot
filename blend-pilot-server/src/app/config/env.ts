import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  MONGO_URI: string;
  NODE_ENV: "development" | "production";
  JWT_ACCESS_SECRET: string;
  BCRYPT_SALT_ROUND: string;
  JWT_ACCESS_EXP: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXP: string;
  BASE_URL: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnv = [
    "PORT",
    "MONGO_URI",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "BCRYPT_SALT_ROUND",
    "JWT_ACCESS_EXP",
    "JWT_REFRESH_EXP",
    "JWT_REFRESH_SECRET",
    "BASE_URL",
  ];
  requiredEnv.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`MIssing require env ${key}`);
    }
  });
  return {
    PORT: process.env.PORT as string,
    MONGO_URI: process.env.MONGO_URI as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    JWT_ACCESS_EXP: process.env.JWT_ACCESS_EXP as string,
    JWT_REFRESH_EXP: process.env.JWT_REFRESH_EXP as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    BASE_URL: process.env.BASE_URL as string,
  };
};

export const envVars = loadEnvVariables();
