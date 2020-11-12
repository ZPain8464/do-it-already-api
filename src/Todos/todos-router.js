const path = require("path");
const express = require("express");
const TodosService = require("./todos-service");

const todosRouter = express.Router();

todosRouter
  .route("/")

  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    TodosService.getAllTodos(knexInstance)
      .then((todos) => {
        res.json(todos);
      })
      .catch(next);
  })
  .post((req, res, next) => {
    const {
      category,
      title,
      description,
      checked,
      category_id,
      user_id,
    } = req.body;
    const newTodo = {
      category,
      title,
      description,
      checked,
      category_id,
      user_id,
    };

    for (const [key, value] of Object.entries(newTodo))
      if (value === null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });
      }

    TodosService.insertTodo(req.app.get("db"), newTodo)
      .then((todo) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${todo.id}`))
          .json(todo);
      })
      .catch(next);
  });

module.exports = todosRouter;
