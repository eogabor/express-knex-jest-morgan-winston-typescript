import Knex from "knex";
import * as config from "../knexfile";

const knex = Knex(config.test);

module.exports = async () => {
  try {
    await knex.raw(
      `DROP DATABASE IF EXISTS ${process.env.TEST_DATABASE_NAME} WITH (FORCE)`
    );
    console.log("Test database tore down.");
    //await knex.migrate.rollback();
    await knex.destroy();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
