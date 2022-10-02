import {Product} from "../Product/Product";
import {useProducts} from "../../hooks/products";
import './ProductList.css';
import {CircularProgress, Pagination, PaginationItem} from "@mui/material";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";

export function ProductsContainer() {
  const location = useLocation(); // props.location in router v5
  const {products, loading} = useProducts();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(parseInt(location.search?.split('=')[1]) || 1);
  // Define data for pager.
  const productsPerPage = 6;
  const lastProductIndex = currentPageNumber * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;
  const currentProducts = products.slice(firstProductIndex, lastProductIndex);

  return (
    <>
      {loading
        ? <CircularProgress />
        : currentProducts ? (
          <>
            <h3 className='product-container-title'>Product List ({products.length})</h3>
            <div className='product-container'>
              {currentProducts.map(product =>
                <Product product={product} key={product.id}/>
              )}
            </div>
            <Pagination
              count={Math.ceil(products.length / productsPerPage)}
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
