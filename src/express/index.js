"use strict";

const express = require("express");

const articlesRoutes = require("./routes/articles");
const myRoutes = require("./routes/my");
const mainRoutes = require("./routes/main");
const logger = require("../logger");

const DEFAULT_PORT = 8080;

const app = express();

app.use("/articles", articlesRoutes);
app.use("/my", myRoutes);
app.use("/", mainRoutes);

app
  .listen(DEFAULT_PORT, () => {
    logger.success(`Приложение запущено на http://localhost:${DEFAULT_PORT}`);
  })
  .on(`error`, (err) => {
    logger.error(`Не удалось запустить приложение. Ошибка: ${err}`);
  });
