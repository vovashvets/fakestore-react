import React, {useContext, useEffect, useState} from "react";
import './SideCard.css';
import {CartItemsContext} from "../../context/CartItems";
import {useProducts} from "../../hooks/products";

interface SideCardProps {
  handleClose: () => void
}

export function SideCard({ handleClose }: SideCardProps) {
  const {items, remove} = useContext(CartItemsContext);
  const {products, loading} = useProducts();

  function ttt() {
    console.log(products)
  }
  ttt()

  return (
    <div className='side-card'>
      <button onClick={handleClose}>X</button>


    </div>
  )
}