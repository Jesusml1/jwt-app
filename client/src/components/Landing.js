import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="jumbotron mt-5">
      <h1>Welcome</h1>
      <p>Sign in and start making your todo's list.</p>
      <Link to="/login" className="btn btn-primary">
        Sign in
      </Link>
      <Link to="/register" className="btn btn-secondary ml-3">
        Sign up
      </Link>
    </div>
  );
};

export default Landing;
