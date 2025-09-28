import { Request, Response } from "express";
import express from "express";

import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import router from "./app/routes/index";
import { envVars } from "./app/config/env";

const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: envVars.CORS_ORIGIN || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.static("public"));

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  try {
    res.send({
      success: true,
      message: "server is running...🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️🏃‍♂️‍➡️🛣️",
    });
  } catch {
    res.send({
      success: true,
      message: "server is not running...🥹🥹👩‍🦽‍➡️👩‍🦽‍➡️🛣️",
    });
  }
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
