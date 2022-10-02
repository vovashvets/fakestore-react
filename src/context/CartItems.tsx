import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";
import {ProductsProps} from "../hooks/products";

interface CartItems {
  items: []
  add: (product: ProductsProps) => void
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

  const add = (product: ProductsProps) => {
    let currentList = typeof cookies.get('cartProducts') === 'undefined'
      ? []
      : cookies.get('cartProducts');

    delete product.description;
    delete product.rating;
    delete product.category;

    let isNewProduct = true;
    let existingProductIndex = 0;

    if (currentList.length === 0) {
      product.amount = 1;
      currentList.push(product);
    } else {
      currentList.forEach((currentProduct: ProductsProps, index: number) => {
        if (currentProduct.id === product.id) {

          isNewProduct = false;
          existingProductIndex = index;
          // let amount = currentProduct.amount + 1;
          // currentProduct.amount = amount;
          // currentProduct.price = product.price * amount;

        }
      })

      if (!isNewProduct) {
        let amount = currentList[existingProductIndex].amount + 1;
        currentList[existingProductIndex].amount = amount;
        currentList[existingProductIndex].price = (product.price * amount);
      } else {
        product.amount = 1;
        currentList.push(product);
      }
    }

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