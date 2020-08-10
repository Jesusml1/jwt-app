const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

// All todos and name

router.get('/', authorization, async (req, res) => {
  try {
    // const user = await pool.query(
    //   'SELECT user_name FROM users WHERE user_id = $1',
    //   [req.user],
    // );

    const user = await pool.query(
      'select users.user_name, todos.todo_id, todos.description from users right join todos on users.user_id = todos.user_id where users.user_id = $1;',
      [req.user],
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// Create a todo

router.post('/todos', authorization, async (req, res) => {
  try {
    const { description } = req.body;
    console.log(req.user.id);
    const newTodo = await pool.query(
      'INSERT INTO todos(user_id, description) VALUES($1, $2) RETURNING *',
      [req.user, description],
    );

    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Update a todo

router.put('/todos/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updated = await pool.query(
      'UPDATE todos set description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
      [description, id, req.user],
    );

    if (updated.rows.length === 0) {
      return res.json('This todo is not yours');
    }

    res.json(updated.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// delete a todo

router.delete('/todos/:id', authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await pool.query(
      'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user],
    );

    if (deleted.rows.length === 0) {
      return res.json('This todo is not yours');
    }

    res.json('todo deleted');
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
