import {useEffect, useState} from "react";
import {getFakeProducts} from "../api/fakestore/FakeStoreServise";

export interface ProductsProps {
  id: number
  title: string
  price: number
  description?: string
  category?: string
  image: string
  rating?: {
    rate: number
    count: number
  }
  amount?: number
}

export function useProducts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [minMaxPriceRange, setPriceRange] = useState<number[]>([]);

  useEffect(() => {
    // Set timeout to see how loader works.
    setTimeout(() => {
      const products = getFakeProducts();
      products.then(jsonResponse => {
        setLoading(false);
        setProducts(jsonResponse);
        setPriceRange(getMinMaxPrice(jsonResponse))
      })
    }, 500)
  }, []);

  function getMinMaxPrice(products: ProductsProps[]) {
    let prices = products.map((product) => {
      return product.price
    });

    return [Math.min(...prices), Math.max(...prices)];
  }

  return {products, loading, minMaxPriceRange}
}