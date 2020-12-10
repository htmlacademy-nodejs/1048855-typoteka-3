"use strict";

const { getRandomInt, shuffle } = require(`../../utils`);
const fs = require(`fs`).promises;
const path = require("path");
const logger = require("../../logger");

const DEFAULT_COUNT = 1;
const MAX_OFFERS_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const fileSentencesPath = path.resolve(`data/sentences.txt`);
const fileTitlesPath = path.resolve(`data/titles.txt`);
const fileCategoriesPath = path.resolve(`data/categories.txt`);

const getDate = () => {
  const threeMonthTimestamp = 7884000000;
  const currentTimestamp = new Date().getTime();
  return new Date(
    getRandomInt(currentTimestamp - threeMonthTimestamp, currentTimestamp)
  ).toLocaleString();
};

const getCategories = (categories, count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    const index = getRandomInt(0, categories.length - 1);
    result.push(...categories.splice(index, 1));
  }

  return result;
};

const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, `utf8`);
    return data.split(`\n`);
  } catch (err) {
    logger.error(err);
    return [];
  }
};

const generateOffers = (count, sentences, titles, categories) =>
  Array(count)
    .fill({})
    .map(() => ({
      category: getCategories(categories, getRandomInt(1, categories.length)),
      announce: shuffle(sentences).slice(1, 5).join(` `),
      fullText: shuffle(sentences)
        .slice(1, getRandomInt(2, sentences.length - 1))
        .join(` `),
      title: titles[getRandomInt(0, titles.length - 1)],
      createdDate: getDate(),
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const [count] = args;
      const sentences = await readFile(fileSentencesPath);
      const titles = await readFile(fileTitlesPath);
      const categories = await readFile(fileCategoriesPath);
      const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
      if (countOffer > MAX_OFFERS_COUNT) {
        logger.error(`Не больше ${MAX_OFFERS_COUNT} публикаций`);
        process.exit(1);
      }
      const content = JSON.stringify(
        generateOffers(countOffer, sentences, titles, categories)
      );
      try {
        await fs.writeFile(FILE_NAME, content);
        logger.success(`Operation success. File created.`);
        process.exit(0);
      } catch {
        return logger.error(`Can't write data to file...`);
      }
    } catch {
      logger.error(`Can't generate data...`);
      process.exit(1);
    }
  },
};
