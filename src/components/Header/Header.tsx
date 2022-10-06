import React from "react";
import {Cart} from "../Cart/Cart";
import './Header.css';
import {NavLink} from "react-router-dom";

export function Header() {
  return (
    <header>
      <div className='main-nav'>
        <h3>
          {/*'end' - makes link active only on home page*/}
          <NavLink to='/' end>Fake store</NavLink>
        </h3>
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>
      <Cart />
    </header>
  )
}