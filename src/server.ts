import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";

export class NotFound extends Error {};
export class InvalidArgument extends Error {};

const app = express();

app.use(express.json());

app.use(router);

app.use((err, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof InvalidArgument) {
    return response.status(400).json({
      error: err.message
    })
  }

  if(err instanceof NotFound) {
    return response.status(404).json({
      error: err.message
    })
  }
  

  if(err instanceof Error) {
  return response.status(500).json({
    error: err.message
  })
}

return response.status(503).json({
  status: "error",
  message: "Internal Server Error"
})
})


app.listen(4500, () => console.log("Server is running"));




