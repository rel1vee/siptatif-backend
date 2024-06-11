import mongoose from "mongoose";
import { logger } from "./logger";
import CONFIG from "../config/environment";

mongoose
  .connect(`${CONFIG.db}`)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.info("Could not connect to DB");
    logger.error(error);
    process.exit(1);
  });
