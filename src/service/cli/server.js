"use strict";

const http = require(`http`);
const { HttpCode } = require("../../constants");
const logger = require("../../logger");
const fs = require(`fs`).promises;

const DEFAULT_PORT = 3000;
const FILENAME = "mocks.json";

const onClientConnect = async (req, res) => {
  const notFoundMessageText = `Not found`;
  switch (req.url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILENAME);
        const mocks = JSON.parse(fileContent);
        const message = mocks.map((post) => `<li>${post.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      }

      break;
    case `/hello`:
      sendResponse(res, HttpCode.OK, "Привет");
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMessageText);
      break;
  }
};

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = statusCode;
  res.writeHead(statusCode, {
    "Content-Type": `text/html; charset=UTF-8`,
  });

  res.end(template);
};

module.exports = {
  name: `--server`,
  run(args) {
    const [portTemp] = args;
    const port = Number.parseInt(portTemp, 10) || DEFAULT_PORT;
    http
      .createServer(onClientConnect)
      .listen(port)
      .on(`listening`, (err) => {
        if (err) {
          return logger.error(`Ошибка при создании сервера`, err);
        }
        return logger.success(`Ожидаю соединений на ${port}`);
      });
  },
};
