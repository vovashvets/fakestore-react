import {Product} from "../Product/Product";
import './ProductList.css';
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ProductsProps } from "../../hooks/products";
import { Link, useLocation } from "react-router-dom";
import React, {ReactNode, Ref, useEffect, useRef, useState} from "react";

interface ProductsListProps {
  products: ProductsProps[]
  loading: boolean
  children: ReactNode
}

export function ProductsList(props: ProductsListProps) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Define data for pager.
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    // Set current page number from the url.
    parseInt(queryParams.get('page') || '') || 1
  );
  const productsPerPage = 6;
  const lastProductIndex = currentPageNumber * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = props.products.slice(firstProductIndex, lastProductIndex);
  const divRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPageNumber]);

  return (
    <div className='products-list-container'>
      {props.children /* Search input */}
      <div ref={divRef} className='product-container-title'>Products found: {props.products.length}</div>
      <div className='product-container'>
        {
          props.loading ? <CircularProgress />
            : props.products ? (
                currentProducts.map((product: ProductsProps) => (
                  <Product
                    product={product}
                    key={product.id}
                  />
                ))
              )
              : (<div>No items</div>)
        }
      </div>
      <Pagination
        count={Math.ceil(props.products.length / productsPerPage)}
        page={currentPageNumber}
        color="primary"
        variant="outlined"
        showFirstButton
        showLastButton
        onChange={(event, num) => {setCurrentPageNumber(num)}}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/products?page=${item.page}`}
            {...item}
          />
        )}
      />
    </div>
  )
}
