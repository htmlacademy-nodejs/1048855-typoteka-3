"use strict";

const { HttpCode } = require("../../constants");
const logger = require("../../logger");
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = "mocks.json";

const express = require(`express`);

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    logger.error(`Ошибка работы с файлом постов. ${err}`);
    res.json([]);
  }
});
app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(`Not found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [portTemp] = args;
    const port = Number.parseInt(portTemp, 10) || DEFAULT_PORT;
    app
      .listen(port, () => {
        logger.success(`Приложение запущено на http://localhost:${port}`);
      })
      .on(`error`, (err) => {
        logger.error(`Не удалось запустить приложение. Ошибка: ${err}`);
      });
  },
};
