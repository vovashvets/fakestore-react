import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {getFakeProduct} from "../api/fakestore/FakeStoreServise";
import {ProductsProps} from "../hooks/products";


export const ProductPage = () => {
  const {id} = useParams(); // Param from route
  const product = getFakeProduct(parseInt(id ?? '0'));
  const [productData, setProductData] = useState<ProductsProps>();

  useEffect(() => {
    product?.then((data: any) => {setProductData(data)})
  }, [])

  return (
    <>
      <h2>{productData?.title}</h2>
      <img className='product-main-image' src={productData?.image} alt="productData?.title"/>
      <p>{productData?.description}</p>
    </>
  )
}