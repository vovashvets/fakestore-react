import { useEffect, useState } from 'react';
import { getFakeCategories, getFakeProducts } from '../api/fakestore/FakeStoreServise';

export interface ProductsProps {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  amount?: number
}

export function useProducts() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [categories, setCategories] = useState<[]>([]);
  const [minMaxPriceRange, setPriceRange] = useState<number[]>([]);

  useEffect(() => {
    getFakeProducts().then(jsonResponse => {
      setLoading(false);
      setProducts(jsonResponse);
      setPriceRange(getMinMaxPrice(jsonResponse));
    });

    getFakeCategories().then((jsonResponse) => {
      setCategories(jsonResponse);
    });
  }, []);

  function getMinMaxPrice(products: ProductsProps[]) {
    const prices = products.map((product) => {
      return product.price;
    });

    return [Math.min(...prices), Math.max(...prices)];
  }

  return { products, categories, loading, minMaxPriceRange };
}
