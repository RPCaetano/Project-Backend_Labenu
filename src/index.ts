
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { userRouter } from "./controller/routes/UserRouter";
import { imageRouter } from "./controller/routes/ImageRouter";
import { AddressInfo } from "net";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/image", imageRouter);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
     const address = server.address() as AddressInfo;
     console.log(`Server running in port: http://localhost:${address.port}`)
  } else {
     console.error(`Fail on running server`)
  }
})