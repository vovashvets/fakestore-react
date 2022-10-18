import {Product} from "../Product/Product";
import {useProducts} from "../../hooks/products";
import './ProductList.css';
import {Button, CircularProgress, Pagination, PaginationItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ProductsProps} from "../../hooks/products";
import {firstSymbolCapitalize} from "../../utils/GlobalUtils";

export function ProductsList() {
  const location = useLocation(); // props.location in router v5
  const queryParams = new URLSearchParams(location.search);
  const {products, loading} = useProducts();
  // Define data for search by title.
  const [searchString, setSearchString] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);
  // Define data for pager.
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    // Set current page number from the url.
    parseInt(queryParams.get('page') || '') || 1
  );
  const productsPerPage = 6;
  const lastProductIndex = currentPageNumber * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts?.slice(firstProductIndex, lastProductIndex);

  const handleSearchTextChange = (event: any) => {
    setSearchString(event.target.value);
  };

  const handleSearch = (event: any) => {
    setSearch(searchString);
  };

  useEffect(() => {
    function productTitleFilter(product: ProductsProps) {
      if (product.title.includes(searchString)
        || product.title.includes(firstSymbolCapitalize(searchString))
      ) {
        return product;
      } else {
        return false;
      }
    }

    if (searchString.length > 1) {
      let result = products.filter(productTitleFilter)
      setFilteredProducts(result);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products])

  return (
    <>
      {loading
        ? <CircularProgress />
        : currentProducts ? (
          <>
            <div className="search-wrapper">
              <TextField
                id="search-input"
                label="Search"
                variant="outlined"
                onChange={handleSearchTextChange}
              />
              <Button
                id="search-submit"
                variant="outlined"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
            <div className='product-container-title'>Products found: {filteredProducts?.length}</div>
            <div className='product-container'>
              {currentProducts.map(product =>
                <Product product={product} key={product.id}/>
              )}
            </div>
            <Pagination
              count={Math.ceil(filteredProducts?.length / productsPerPage)}
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
          </>
        ) : (
          <div>No items</div>
        )
      }
    </>)
}
