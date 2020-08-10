import React, { Fragment, useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState('');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('token', localStorage.token);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch(
        'http://localhost:5000/dashboard/todos',
        {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body),
        },
      );
      await response.json();
      setTodosChange(true);
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h2 className="text-center mt-5">Todo list</h2>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
