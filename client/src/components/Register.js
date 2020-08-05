import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };

      const response = await fetch(
        'http://localhost:5000/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );

      const parseRes = await response.json();
      if (parseRes.token) {
        setAuth(true);
        localStorage.setItem('token', parseRes.token);
        toast.success('Sign up successfully', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      } else {
        toast.error(parseRes, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center my-5">Register</h1>
      <form className="mt-5" onSubmit={onSubmitForm}>
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
        <label>Name:</label>
        <input
          className="form-control my-3"
          type="text"
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block my-3">
          Sign up
        </button>
      </form>
      <p className="text-center my-5">
        Already sign up?
        <Link to="/login"> Log in</Link>
      </p>
    </Fragment>
  );
};

export default Register;
