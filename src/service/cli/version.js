"use strict";

const packageJsonFile = require(`../../../package.json`);
const logger = require("../../logger");

module.exports = {
  name: `--version`,
  run() {
    const version = packageJsonFile.version;
    logger.info(version);
  },
};
