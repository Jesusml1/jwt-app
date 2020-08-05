import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/dashboard',
        {
          method: 'GET',
          headers: {
            token: localStorage.token,
          },
        },
      );
      const parseRes = await response.json();

      setName(parseRes.user_name);
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
  }, []);

  return (
    <Fragment>
      <h1 className="text-center my-5">Dashboard</h1>
      <h3>{name}</h3>
      <button className="btn btn-warning" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
