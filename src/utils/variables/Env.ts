import dotenv from "dotenv";

dotenv.config();

class Env {
  static NODE_ENV: string = process.env.NODE_ENV || "prod";
  static PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  static DB_HOST: string = process.env.DB_HOST || "localhost";
  static DB_PORT: number = process.env.DB_PORT
    ? parseInt(process.env.DB_PORT)
    : 5432;
  static DB_USERNAME: string = process.env.DB_USERNAME || "postgres";
  static DB_PASSWORD: string = process.env.DB_PASSWORD || "secret";
  static DB_NAME: string = process.env.DB_NAME || "typeorm-db";
  static JWT_SECRET: string = process.env.JWT_SECRET || "jwt_secret";
  static CLOUDINARY_CLOUD_NAME: string =
    process.env.CLOUDINARY_CLOUD_NAME || "cludinary_cloud_name";
  static CLOUDINARY_API_KEY: string =
    process.env.CLOUDINARY_API_KEY || "cludinary_api_key";
  static CLOUDINARY_API_SECRET: string =
    process.env.CLOUDINARY_API_SECRET || "cludinary_api_secret";
  static AMQP_SERVER: string = process.env.AMQP_SERVER || "amqp://localhost";
  static REDIS_PORT: number = process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT)
    : 6379;
  static REDIS_HOST: string = process.env.REDIS_HOST || "redis.com";
  static REDIS_PASSWORD: string = process.env.REDIS_PASSWORD || "secretredispw";
}

export default Env;
