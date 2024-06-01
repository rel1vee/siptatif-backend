import pino from "pino";
import moment from "moment";
import pretty from "pino-pretty";

export const logger = pino(
  {
    base: {
      pid: false,
    },
    timestamp: () => `,"time":"${moment().format()}"`,
  },
  pretty()
);
