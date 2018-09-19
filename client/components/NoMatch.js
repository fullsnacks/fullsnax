import React from 'react';
import { Link } from 'react-router-dom'

const NoMatch = () => {
  return (
    <div>
      <h1>Page not found:</h1>
      <Link to='/'><h2>Go Back Home</h2></Link>
      <img src="/404.png" width="500" alt=""/>
    </div>
  );
};

export default NoMatch;
