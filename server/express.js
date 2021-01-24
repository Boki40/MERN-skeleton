import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

import Template from "./../template";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

import path from "path";

const CURRENT_WORKING_DIR = process.cwd();

//comment out in production
import devBundle from "./devBundle";
import React from "react";
import { StaticRouter } from "react-router";
import MainRouter from "../client/MainRouter";
import ReactDOMServer from "react-dom/server";

const app = express();

//Ki kell commentelni build esetén
devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));
app.get("/", (req, res) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <MainRouter />
    </StaticRouter>
  );

  res.status(200).send(Template({ markup: markup }));
});

app.use("/", userRoutes);
app.use("/", authRoutes);

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
