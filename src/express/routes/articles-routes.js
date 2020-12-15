`use strict`;

const { Router } = require(`express`);
const offersRouter = new Router();

offersRouter.get(`/category/:id`, (req, res) =>
  res.send(`/articles/category/:id`)
);
offersRouter.get(`/add`, (req, res) => res.send(`/articles/add`));
offersRouter.get(`/edit/:id`, (req, res) => res.send(`/articles/edit/:id`));
offersRouter.get(`/:id`, (req, res) => res.send(`/articles/:id`));

module.exports = offersRouter;
