const express = require("express");
const CategoriesService = require("./categories-service");

const categoriesRouter = express.Router();

categoriesRouter
  .route("/")

  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    CategoriesService.getAllCats(knexInstance)
      .then((cats) => {
        res.json(cats);
      })
      .catch(next);
  });

module.exports = categoriesRouter;
