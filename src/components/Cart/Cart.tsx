import React, {useContext, useEffect, useState} from "react";
import './Cart.css'
import {SideCard} from "../SideCart/SideCard";
import {CartItemsContext} from "../../context/CartItems";
import {Button} from "@mui/material";

export function Cart() {
  const [sideCart, setSideCart] = useState(false);
  const {items} = useContext(CartItemsContext);

  const clickHandler = () => {
    setSideCart(prev => !prev)
  }

  return (
    <>
      <Button onClick={clickHandler} variant="outlined">
        Cart ({items.length})
      </Button>

      {sideCart && <SideCard handleClose={clickHandler}/>}
    </>
  )
}