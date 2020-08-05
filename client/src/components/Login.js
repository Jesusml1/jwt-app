import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch(
        'http://localhost:5000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      const parsRes = await response.json();

      if (parsRes.token) {
        localStorage.setItem('token', parsRes.token);
        setAuth(true);
        toast.success('Log in successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        setAuth(false);
        toast.error(parsRes, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <label>Email:</label>
        <input
          className="form-control my-3"
          type="email"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <label>Password:</label>
        <input
          className="form-control my-3"
          type="password"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Login</button>
      </form>
      <p className="text-center my-5">
        Not sign up already?
        <Link to="/register"> Register</Link>
      </p>
    </Fragment>
  );
};

export default Login;
