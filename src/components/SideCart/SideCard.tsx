import React, {useContext} from "react";
import {CartItemsContext} from "../../context/CartItems";
import {ProductsProps} from "../../hooks/products";
import {Button, Stack, Card, Divider} from "@mui/material";
import {roundToTwo} from "../../utils/GlobalUtils";
import {StyledSideCard} from "./StyledSideCard";

interface SideCardProps {
  handleClose: () => void
}

export function SideCard({ handleClose }: SideCardProps) {
  const {items, remove, increaseDecrease} = useContext(CartItemsContext);

  function getTotal(){
    let total = 0;
    items?.forEach((product: ProductsProps) => {
      total += product.price;
    })

    return roundToTwo(total);
  }

  return (
    <StyledSideCard>
      <Button variant={"outlined"} className='close-button' onClick={handleClose}>
        Close
      </Button>
      {items.length !== 0
        ? (
        <>
          <Stack spacing={2} className='cart-stack'>
            {items.map((product: ProductsProps, index) => (
              <Card>
                <div>
                  <img className='cart-product-image' src={product.image} alt={product.title}/>
                </div>
                <Divider orientation={"vertical"} />
                <div className='product-title'>{product.title}</div>
                <Divider orientation={"vertical"} />
                <div>
                    <Button onClick={() => increaseDecrease(product.id, 'increase')}>
                      +
                    </Button>
                    <div className='amount'>
                      x{product.amount}
                    </div>
                    <Button onClick={() => increaseDecrease(product.id, 'decrease')}>
                      -
                    </Button>
                  </div>
                <Divider orientation={"vertical"} />
                <div>
                    <div>${product.price}</div>
                    <Divider />
                    <button className='remove-button' onClick={() => remove(product.id)}>Remove</button>
                  </div>
              </Card>
            ))}
          </Stack>

          <div className='cart-total'><b>Total:</b> ${getTotal()}</div>
          <Button className='purchase-button' variant="contained">
            Purchase
          </Button>
        </>
      )
      : <h3>Empty Cart</h3> }
    </StyledSideCard>
  )
}