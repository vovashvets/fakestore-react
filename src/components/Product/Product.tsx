import React, {useContext, useState} from "react";
import {ProductsProps} from "../../hooks/products";
import {CartItemsContext} from "../../context/CartItems";
import {Button, Divider, Paper} from "@mui/material";
import {Link} from "react-router-dom";
import {StyledProduct} from "./StyledProduct";

interface ProductProps {
  product: ProductsProps
}

export function Product(props: ProductProps) {
  const [showDetails, setShowDetails] = useState(false)
  const buttonClasses = ['btn', showDetails ? 'active' : 'disactive'];
  const {add} = useContext(CartItemsContext);

  return (
    <StyledProduct>
      <Paper className='product' elevation={3}>
        <Link className='product-title' to={'/product/' + props.product.id}>
          <b>{props.product.title}</b>
        </Link>
        <Divider />
        <div>
          Category: {props.product.category}
        </div>
        <div>
          Rating: {props.product.rating?.rate}
        </div>
        <div>
          <img className={'product-image'} src={props.product.image} alt={props.product.title}/>
        </div>
        <div>
          ${props.product.price}
        </div>
        <div>
          <Button
            variant="outlined"
            className={buttonClasses.join(' ')}
            onClick={() => setShowDetails(prev => !prev)}
          >
            {showDetails ? 'Hide Description' : 'Show Description'}
          </Button>
          <Button variant="contained" onClick={() => add(props.product)}>
            Add To Card
          </Button>
        </div>
        {showDetails &&
          <p className='product-description'>
            {props.product.description}
          </p>
        }
      </Paper>
    </StyledProduct>
  )
}