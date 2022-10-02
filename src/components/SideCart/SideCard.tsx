import React, {useContext, useEffect, useState} from "react";
import './SideCard.css';
import {CartItemsContext} from "../../context/CartItems";
import {ProductsProps} from "../../hooks/products";

interface SideCardProps {
  handleClose: () => void
}

export function SideCard({ handleClose }: SideCardProps) {
  const {items, remove} = useContext(CartItemsContext);

  function getTotal(){
    let total = 0;
    items?.forEach((product: ProductsProps) => {
      total += product.price;
    })

    return total.toFixed(2);
  }

  return (
    <div className='side-card'>
      <button className='close-button' onClick={handleClose}>X</button>

      {items.length !== 0
        ? (
        <>
          <table>
            <tbody>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Price</th>
              <th></th>
            </tr>
            {items.map((product: ProductsProps, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td><img className='cart-product-image' src={product.image} alt={product.title}/></td>
                <td>{product.title}</td>
                <td>x{product.amount}</td>
                <td>${product.price}</td>
                <td><button className='remove-button' onClick={() => remove(product.id)}>Remove</button></td>
              </tr>
            ))}
            </tbody>
          </table>

          <div className='cart-total'><b>Total:</b> ${getTotal()}</div>
          <button className='purchase-button'>Purchase</button>
        </>
      )
      : <h3>Empty Cart</h3> }
    </div>
  )
}