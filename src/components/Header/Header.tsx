import React from "react";
import {Cart} from "../Cart/Cart";
import './Header.css';
import {Link} from "react-router-dom";

export function Header() {
  return (
    <header>
      <div className='main-nav'>
        <h3>
          <Link to='/'>Fake store</Link>
        </h3>
        <Link to='/products'>Products</Link>
        <Link to='/about'>About</Link>
      </div>
      <Cart />
    </header>
  )
}