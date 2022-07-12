import { db } from "./db";
import { app, logger } from "./app";
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}.`));
