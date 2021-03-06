require("dotenv").config();
const logger = require("./logger");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const todosRouter = require("./Todos/todos-router");
const categoriesRouter = require("./Categories/categories-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(express.json());
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(usersRouter);
app.use("/api/auth/", authRouter);
app.use("/api/todos", todosRouter);
app.use("/api/categories", categoriesRouter);

app.get("/api/dia", (req, res) => {
  res.send("Hello, world!");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
