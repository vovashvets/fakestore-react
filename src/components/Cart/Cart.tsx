import React, {useContext, useEffect, useState} from "react";
import './Cart.css'
import {SideCard} from "../SideCart/SideCard";
import {CartItemsContext} from "../../context/CartItems";

export function Cart() {
  const [sideCart, setSideCart] = useState(false);
  const {items} = useContext(CartItemsContext);

  const clickHandler = () => {
    setSideCart(prev => !prev)
  }

  return (
    <>
      <div className={'cart'} onClick={clickHandler}>
        Cart ({items.length})
      </div>

      {sideCart && <SideCard handleClose={clickHandler}/>}
    </>
  )
}