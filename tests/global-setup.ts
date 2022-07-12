import Knex from "knex";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
import * as config from "../knexfile";

// Create the database
async function createTestDatabase() {
  let conf: any = config.test;
  conf.connection.database = undefined;
  const knex = Knex(conf);

  try {
    await knex.raw(`DROP DATABASE IF EXISTS ${process.env.TEST_DATABASE_NAME}`);
    await knex.raw(`CREATE DATABASE ${process.env.TEST_DATABASE_NAME}`);
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

// Seed the database with schema and data
async function seedTestDatabase() {
  const knex = Knex(config.test);

  try {
    await knex.migrate.latest();
    await knex.seed.run();
  } catch (error: any) {
    throw new Error(error);
  } finally {
    await knex.destroy();
  }
}

module.exports = async () => {
  try {
    await createTestDatabase();
    await seedTestDatabase();
    console.log("Test database created successfully");
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};
