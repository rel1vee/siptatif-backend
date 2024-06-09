import cors from "cors";
import "./utils/connection";
import { routes } from "./routes";
import bodyParser from "body-parser";
import { logger } from "./utils/logger";
import deserializedToken from "./middleware/deserializedToken";
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const port: Number = 3000;

// Parse body request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors access handler
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(deserializedToken);

routes(app);

// Root endpoint
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: "OK",
    statusCode: 200,
    message: "REST API SIPTATIF",
  });
});

// Error handling endpoint
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Endpoint not found");

  res.status(404).json({
    status: "Error",
    statusCode: 404,
    message: error.message,
  });
});

app.listen(port, () => {
  logger.info(`Server is listening on port ${port}`);
});
