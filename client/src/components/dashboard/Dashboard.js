import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Components
import InputTodo from './todolist/InputTodo';
import TodoList from './todolist/TodoList';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getName = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/dashboard/',
        {
          method: 'GET',
          headers: {
            token: localStorage.token,
          },
        },
      );
      const parseRes = await response.json();
      setAllTodos(parseRes);
      setName(parseRes[0].user_name);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
    toast.success('Log out successfully', {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    getName();
    setTodosChange(false);
  }, [todosChange]);

  return (
    <Fragment>
      <div className="d-flex mt-5 justify-content-around">
        <h1 className="text-center">Welcome {name}</h1>
        <button
          className="btn btn-warning"
          onClick={(e) => logout(e)}
        >
          Logout
        </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <TodoList allTodos={allTodos} setTodosChange={setTodosChange} />
    </Fragment>
  );
};

export default Dashboard;
