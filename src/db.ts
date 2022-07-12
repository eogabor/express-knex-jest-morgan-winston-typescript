import * as config from "../knexfile";
import knex from "knex";
const environment = process.env.NODE_ENV || "development";

export const db = knex(
  (config as any)[environment] || (config as any).development
);

import * as knexp from "knex-paginate";
knexp.attachPaginate();
