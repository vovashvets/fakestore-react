import React, {useContext, useState} from "react";
import {ProductsProps} from "../../hooks/products";
import './Product.css';
import {CartItemsContext} from "../../context/CartItems";

interface ProductProps {
  product: ProductsProps
}

export function Product(props: ProductProps) {
  const [showDetails, setShowDetails] = useState(false)
  const buttonClasses = ['btn', showDetails ? 'active' : 'disactive'];
  const {add} = useContext(CartItemsContext);

  return (
    <div className={'product'}>
      <p>{props.product.title}</p>
      <div>
        <img className={'product-image'} src={props.product.image} alt={props.product.title}/>
      </div>
      <div>
        ${props.product.price}
      </div>
      <div>
        <button
          className={buttonClasses.join(' ')}
          onClick={() => setShowDetails(prev => !prev)}
        >
          {showDetails ? 'Hide Description' : 'Show Description'}
        </button>
        <button className={'btn'} onClick={() => add(props.product)}>
          Add To Card
        </button>
      </div>
      {showDetails &&
        <p className='product-description'>
          {props.product.description}
        </p>
      }
    </div>
  )
}