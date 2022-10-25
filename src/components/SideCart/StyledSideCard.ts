import styled from "styled-components";

export const StyledSideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 60px 15px 25px;
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30%;
  z-index: 10;
  overflow: scroll;
  background-color: #f8f8f8;
  box-shadow: -5px 0 15px #9e9e9e;
  animation-name: side-cart-animation;
  animation-duration: 0.5s;

  &::-webkit-scrollbar {
    background: transparent;
    width: 0;
  }

  @keyframes side-cart-animation {
    0% {
      right: -600px;
    }
    100% {
      right: 0;
    }
  }
  
  .cart-stack{
    width: 100%;
  }

  .product-title {
    width: 40%;
  }
  
  .cart-product-image {
    max-width: 50px;
  }

  .close-button {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  
  .MuiPaper-root {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    padding: 5px;
    text-align: center;
  }

  .MuiPaper-root div {
    padding: 15px;
  }

  .cart-total {
    margin: 15px 0;
  }

  .remove-button {
    margin: 15px;
    padding: 5px 10px;
    cursor: pointer;
    border: 0;
    border-radius: 5px;
    background-color: darksalmon;
  }

  .amount {
    display: flex;
    justify-content: center;
  }
`