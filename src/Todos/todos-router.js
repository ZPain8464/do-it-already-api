const path = require("path");
const express = require("express");
const TodosService = require("./todos-service");
const { requireAuth } = require("../middleware/jwt-auth");
const logger = require("../logger");

const todosRouter = express.Router();

todosRouter
  .route("/")

  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const user_id = req.user.id;
    TodosService.getAllTodos(knexInstance, user_id)
      .then((todos) => {
        res.json(todos);
      })
      .catch(next);
  })
  .post(requireAuth, (req, res, next) => {
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
      if (value == null) {
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

todosRouter
  .route("/:id")
  .all((req, res, next) => {
    TodosService.getById(req.app.get("db"), req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).json({
            error: { message: `Todo doesn't exist` },
          });
        }
        res.todo = todo;
        next();
      })
      .catch(next);
  })
  .get(requireAuth, (req, res, next) => {
    res.json(res.todo);
  })
  .delete(requireAuth, (req, res, next) => {
    TodosService.deleteTodo(req.app.get("db"), req.params.id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(requireAuth, (req, res, next) => {
    const {
      id,
      title,
      description,
      category,
      category_id,
      checked,
      user_id,
      start_date,
    } = req.body;

    const todoToUpdate = {
      id,
      title,
      description,
      category,
      category_id,
      checked,
      user_id,
      start_date,
    };

    const numberOfValues = Object.values(todoToUpdate).filter(Boolean).length;
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`);
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'description' or 'title'`,
        },
      });
    }

    TodosService.updateTodo(req.app.get("db"), req.params.id, todoToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .put(requireAuth, (req, res, next) => {
    const { id, checked } = req.body;
    const todoCheck = { id, checked };

    const numberOfValues = Object.values(todoCheck).filter(Boolean).length;
    if (numberOfValues === 0) {
      logger.error(`Invalid update without required fields`);
      return res.status(400).json({
        error: {
          message: `Request body must contain either 'description' or 'title'`,
        },
      });
    }
    TodosService.updateChecked(req.app.get("db"), req.params.id, todoCheck)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = todosRouter;
