import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
import { ProductsList } from "../components/ProductList/ProductsList";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { ProductsFilter } from "../components/ProductsFilter/ProductsFilter";
import {ProductsProps, useProducts} from "../hooks/products";
import {Button, TextField, Snackbar, Alert} from "@mui/material";
import {firstSymbolCapitalize} from "../utils/GlobalUtils";
import {CartItemsContext} from "../context/CartItems";
import styled from "styled-components";

const StyledProducts = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  
  .MuiCircularProgress-root {
    margin-left: 35vw;
    margin-top: 35vh;
  }

  .MuiPagination-root {
    display: flex;
    justify-content: center;
    padding: 30px;
  }
`

export const Products = () => {
  const {products, loading} = useProducts();
  // Define data for search by title.
  const [searchString, setSearchString] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);
  // Define data for filters.
  const [priceRange, setPriceRange] = useState<number | number[]>([0, 0]);
  const [selectedCategories, setSelectedCategories] = useState<Map<string, boolean>>(new Map());
  const {snackbar, handleSnackbarClose} = useContext(CartItemsContext);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  function handlePriceRangeChange(event: Event, value: number | number[]) {
    setPriceRange(value);
  }

  function handleCategoryChange(event: ChangeEvent<HTMLInputElement>) {
    let updatedCategories = new Map(selectedCategories);

    if (updatedCategories?.get(event.target.id)) {
      updatedCategories?.set(event.target.id, false);
    } else {
      updatedCategories?.set(event.target.id, true);
    }

    setSelectedCategories(updatedCategories);
  }

  function handleSearchTextChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchString(event.target.value);
  }

  // Filters are arranged by priority.
  function handleFilters() {
    let result = products;

    // Filter products by categories.
    if (selectedCategories.size) {
      result = result.filter(product => {
        return selectedCategories.get(product.category)
      });
    }
    // Filter products by price range.
    if (priceRange instanceof Array && priceRange[0] !== 0 && priceRange[1] !== 0) {
      result = result.filter(product => {
        return product.price <= priceRange[1] && product.price >= priceRange[0]
      });
    }
    // Filter products by title.
    if (searchString.length > 2) {
      result = result.filter(product => {
        if (product.title.includes(searchString) || product.title.includes(firstSymbolCapitalize(searchString))) {
          return product;
        } else {
          return false;
        }
      });
    }

    setFilteredProducts(result);
  }

  function handleFiltersReset() {
    setSelectedCategories(new Map())
    setPriceRange([0, 0])
    setFilteredProducts(products);
    setSearchString('');
  }

  return (
    <StyledProducts>
      <Sidebar>
        <ProductsFilter
          handleFilters={handleFilters}
          handlePriceRangeChange={handlePriceRangeChange}
          priceRange={priceRange}
          handleCategoryChange={handleCategoryChange}
          handleFiltersReset={handleFiltersReset}
          selectedCategories={selectedCategories}
        />
      </Sidebar>
      <ProductsList
        products={filteredProducts}
        loading={loading}
      >
        <div className="search-wrapper">
          <TextField
            id="search-input"
            label="Search"
            variant="outlined"
            onChange={handleSearchTextChange}
            value={searchString}
          />
          <Button
            id="search-submit"
            variant="outlined"
            onClick={() => handleFilters()}
          >
            Search
          </Button>
        </div>
      </ProductsList>
      <Snackbar
        open={snackbar}
        autoHideDuration={1500}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity="success"
        >
          The product has been added to the cart
        </Alert>
      </Snackbar>
    </StyledProducts>
  );
}