import {Product} from "../Product/Product";
import {useProducts} from "../../hooks/products";
import './ProductList.css';

export function ProductsContainer() {
  const {products, loading} = useProducts();

  return (
    products ? (
      <>
        {loading && <p>Loading...</p>}
        <h3 className='product-container-title'>Product List ({products.length})</h3>
        <div className='product-container'>
          {products.map(product =>
            <Product product={product} key={product.id}/>
          )}
        </div>
      </>
    ) : (
      <div>No items</div>
    )
  );
}
