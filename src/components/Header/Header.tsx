import React from "react";
import {Cart} from "../Cart/Cart";
import './Header.css';

export function Header() {
  return (
    <header>
      <h3>
        The best fake store
      </h3>
      <Cart />
    </header>
  )
}