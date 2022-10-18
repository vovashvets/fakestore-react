import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";
import {ProductsProps} from "../hooks/products";

interface CartItems {
  items: []
  add: (product: ProductsProps) => void
  remove: (id: number) => void
  increaseDecrease: (id: number, action: "increase" | "decrease") => void
}

export const CartItemsContext = createContext<CartItems>({
  // Default value
  items: [],
  add: () => {}, // Just an empty function
  remove: () => {},
  increaseDecrease: () => {},
});

export const CartItemsState = ({children}: {children:React.ReactNode}) => {
  const cookies = new Cookies();
  let currentList = typeof cookies.get('cartProducts') === 'undefined'
    ? []
    : cookies.get('cartProducts');
  const [items, setItems] = useState<[]>(currentList);
  let date = new Date();
  date.setTime(date.getTime() + (60*60*1000)); // +1 hour

  const add = (product: ProductsProps) => {
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
    const newArr = currentList.filter((object: ProductsProps) => {
      return object.id !== id;
    });
    cookies.set('cartProducts', newArr, { path: '/', expires: date});
    setItems(newArr)
  }

  const increaseDecrease = (id: number, action: string) => {
    currentList.forEach((currentProduct: ProductsProps, index: number) => {
      if (currentProduct.id === id) {
        let prevAmount = currentList[index].amount;
        let amount = currentList[index].amount;
        action === 'increase'
          ? amount++
          : amount > 1 && amount--;
        currentList[index].amount = amount;

        if (action === 'increase') {
          currentList[index].price = roundToTwo(currentProduct.price + (currentProduct.price/(amount - 1)));
        } else {
          if (prevAmount !== 1) {
            currentList[index].price = roundToTwo(currentProduct.price - (currentProduct.price/(amount + 1)));
          }
        }
      }
    })
    cookies.set('cartProducts', currentList, { path: '/', expires: date});
    setItems(currentList);
  }

  // Helper function that works better than toFixed(2) in current case.
  function roundToTwo(num: number) {
    return Math.round( num * 100 + Number.EPSILON ) / 100
  }

  return (
    <CartItemsContext.Provider value={{items, add, remove, increaseDecrease}}>
      {children}
    </CartItemsContext.Provider>
  )
}