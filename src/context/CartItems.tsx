import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";
import {ProductsProps} from "../hooks/products";

interface CartItems {
  items: []
  add: (product: {}) => void
  remove: (id: number) => void
}

// Get products from cookie or empty array in case of none cookie.
const cookies = new Cookies();
let currentList: [] = typeof cookies.get('cartProducts') === 'undefined'
  ? []
  : cookies.get('cartProducts');

export const CartItemsContext = createContext<CartItems>({
  // Default value
  items: [],
  add: () => {}, // Just an empty function
  remove: () => {},
});

export const CartItemsState = ({children}: {children:React.ReactNode}) => {
  const [items, setItems] = useState<[]>(currentList);
  const cookies = new Cookies();
  let date = new Date();
  date.setTime(date.getTime() + (60*60*1000)); // +1 hour

  const add = (product: {}) => {
    let currentList = typeof cookies.get('cartProducts') === 'undefined'
      ? []
      : cookies.get('cartProducts');
    currentList.push(product);


    cookies.set('cartProducts', currentList, { path: '/', expires: date});
    setItems(currentList);
  }

  const remove = (id: number) => {
    let currentList = cookies.get('cartProducts');
    const arr = [{id: 1}, {id: 3}, {id: 5}];

    const newArr = currentList.filter((object: ProductsProps) => {
      return object.id !== id;
    });

    cookies.set('cartProducts', newArr, { path: '/', expires: date});
    setItems(newArr)
  }

  return (
    <CartItemsContext.Provider value={{items, add, remove}}>
      {children}
    </CartItemsContext.Provider>
  )
}