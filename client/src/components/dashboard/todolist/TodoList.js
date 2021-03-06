import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const TodoList = ({ allTodos, setTodosChange }) => {
  const [todos, setTodos] = useState([allTodos]);

  // Delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: { token: localStorage.token },
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Display list of todos
  // const getTodos = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/todos');
  //     const jsonData = await response.json();

  //     setTodos(jsonData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <table rowKey="name" className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{todo.description}</td>
                <td>
                  <EditTodo
                    todo={todo}
                    setTodosChange={setTodosChange}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TodoList;
