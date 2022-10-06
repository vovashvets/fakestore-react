import {Product} from "../Product/Product";
import {useProducts} from "../../hooks/products";
import './ProductList.css';
import {CircularProgress, Pagination, PaginationItem, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {ProductsProps} from "../../hooks/products";

export function ProductsContainer() {
  const location = useLocation(); // props.location in router v5
  const {products, loading} = useProducts();
  // Define data for search by title.
  const [searchString, setSearchString] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<ProductsProps[]>([]);
  // Define data for pager.
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(
    // Set current page number from the url.
    parseInt(location.search?.split('=')[1]) || 1
  );
  const productsPerPage = 6;
  const lastProductIndex = currentPageNumber * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = filteredProducts?.slice(firstProductIndex, lastProductIndex);

  const handleSearchTextChange = (event: any) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    function productTitleFilter(product: ProductsProps) {
      if (product.title.includes(searchString)
        || product.title.includes(searchString.charAt(0).toUpperCase() + searchString.slice(1))
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
  }, [searchString, products])

  return (
    <>
      {loading
        ? <CircularProgress />
        : currentProducts ? (
          <>
            <TextField
              id="product-search"
              label="Search"
              variant="outlined"
              onChange={handleSearchTextChange}
            />
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
              onChange={(_, num) => {setCurrentPageNumber(num)}}
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
