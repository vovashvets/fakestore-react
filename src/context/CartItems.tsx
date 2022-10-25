import React, {createContext, useState} from "react";
import Cookies from "universal-cookie";
import {ProductsProps} from "../hooks/products";
import {roundToTwo} from "../utils/GlobalUtils";

interface CartItems {
  items: ProductsProps[]
  add: (product: ProductsProps) => void
  remove: (id: number) => void
  increaseDecrease: (id: number, action: "increase" | "decrease") => void
  snackbar: boolean
  handleSnackbarClose: () => void
}

export const CartItemsContext = createContext<CartItems>({
  // Default value
  items: [],
  add: () => {}, // Just an empty function
  remove: () => {},
  increaseDecrease: () => {},
  snackbar: false,
  handleSnackbarClose:() => {},
});

export const CartItemsState = ({children}: {children:React.ReactNode}) => {
  const cookies = new Cookies();
  let currentList = typeof cookies.get('cartProducts') === 'undefined'
    ? []
    : cookies.get('cartProducts');
  const [items, setItems] = useState<ProductsProps[]>(currentList);
  let date = new Date();
  date.setTime(date.getTime() + (60*60*1000)); // +1 hour
  const [snackbar, setSnackbar] = useState(false);

  function handleSnackbarClose() {
    setSnackbar(false);
  }

  const add = (product: ProductsProps) => {
    setSnackbar(true);
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

    setItems([...currentList]);
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

  return (
    <CartItemsContext.Provider value={{items, add, remove, increaseDecrease, snackbar, handleSnackbarClose}}>
      {children}
    </CartItemsContext.Provider>
  )
}