// Update with your config settings.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "admin",
      database: "aquaform",
      port: 5432,
      host: "localhost",
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: process.env.KNEX_MIGRATION_TABLE_NAME,
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  production: {
    client: "pg",
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PW,
      port: Number(process.env.DATABASE_PORT),
      host: process.env.DATABASE_HOST,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: process.env.KNEX_MIGRATION_TABLE_NAME,
    },
    seeds: {
      directory: "./db/seeds",
    },
  },

  test: {
    client: "pg",
    connection: {
      user: "postgres",
      password: "admin",
      database: process.env.TEST_DATABASE_NAME,
      port: 5432,
      host: "localhost",
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
      tableName: process.env.KNEX_MIGRATION_TABLE_NAME,
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
