import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

const HeaderMenu = () => {
  return (
    <div>
      <Link to="/">Главная</Link>
      <Link to="/log">Главная 2</Link>
      <Link to="/admin">Админка</Link>
    </div>
  );
};

export default HeaderMenu;