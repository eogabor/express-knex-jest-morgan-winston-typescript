export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      DATABASE_NAME: string;
      DATABSE_USER: string;
      DATABASE_PW: string;
      DATABASE_PORT: number;
      DATABASE_HOST: string;
      KNEX_MIGRATION_TABLE_NAME: string;
      TEST_DATABASE_NAME: string;
      LOG_FILE_PREFIX: string;
    }
  }
}
