const TodosService = {
  getAllTodos(knex) {
    return knex.select("*").from("todos");
  },

  insertTodo(knex, newTodo) {
    return knex
      .insert(newTodo)
      .into("todos")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};

module.exports = TodosService;
