const TodosService = {
  getAllTodos(knex, user_id) {
    return knex.from("todos").select("*").where("user_id", user_id);
  },
  getById(knex, id) {
    return knex.from("todos").select("*").where("id", id).first();
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
  deleteTodo(knex, id) {
    return knex("todos").where({ id }).delete();
  },
  updateTodo(knex, id, newTodoFields) {
    return knex("todos").where({ id }).update(newTodoFields);
  },
  updateChecked(knex, id, newTodoFields) {
    return knex("todos").where({ id }).update(newTodoFields);
  },
};

module.exports = TodosService;
