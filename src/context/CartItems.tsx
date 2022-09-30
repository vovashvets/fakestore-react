import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";

interface CartItems {
  items: []
  add: (id: number) => void
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

  const add = (id: number) => {
    const cookies = new Cookies();
    let currentList = typeof cookies.get('cartProducts') === 'undefined'
      ? []
      : cookies.get('cartProducts');
    currentList.push(id);

    let date = new Date();
    date.setTime(date.getTime() + (60*60*1000)); // +1 hour
    cookies.set('cartProducts', currentList, { path: '/', expires: date});
    setItems(currentList);
  }

  const remove = () => {

  }

  return (
    <CartItemsContext.Provider value={{items, add, remove}}>
      {children}
    </CartItemsContext.Provider>
  )
}