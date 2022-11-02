import {Product} from "../Product/Product";
import { CircularProgress, Pagination, PaginationItem } from "@mui/material";
import { ProductsProps } from "../../hooks/products";
import { Link, useLocation } from "react-router-dom";
import React, {ReactNode, RefObject, useEffect, useState} from "react";
import styled from "styled-components";

const StyledProductList = styled.div`
  .product-container {
    display: grid;
    grid-template: 1fr 1fr  / 1fr 1fr 1fr;
    padding: 50px;
    grid-gap: 30px;
  }

  .product-container-title {
    display: flex;justify-content: center;
    padding: 20px;
  }

  .search-wrapper {
    display: flex;
    justify-content: center;
    padding: 50px 0 10px;
  }
  .MuiTextField-root {
    width: 40%;
    margin-right: 10px;
  }
`

interface ProductsListProps {
  products: ProductsProps[]
  loading: boolean
  children: ReactNode
  searchRef: RefObject<HTMLInputElement>
}

export function ProductsList(props: ProductsListProps) {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  // Define data for pager.
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    // Set current page number from the url.
    parseInt(queryParams.get('page') || '') || 1
  );
  const productsPerPage = 9;
  const lastProductIndex = currentPageNumber * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = props.products.slice(firstProductIndex, lastProductIndex);

  useEffect(() => {
    props.searchRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentPageNumber]);

  return (
    <StyledProductList className='products-list-container'>
      {props.children /* Search input */}
      <div className='product-container-title'>Products found: {props.products.length}</div>
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
    </StyledProductList>
  )
}
