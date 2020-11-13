const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeUsersArray } = require("./users.fixtures");
const { makeCatArray } = require("./categories.fixtures");
const { makeTodosArray } = require("./todos.fixtures");

const TodosService = require("../src/Todos/todos-service");

describe(`Todos endpoints`, function () {
  let db;
  let testTodos = makeTodosArray();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () =>
    db.raw(
      "TRUNCATE blogful_articles, blogful_users, blogful_comments RESTART IDENTITY CASCADE"
    )
  );
});
