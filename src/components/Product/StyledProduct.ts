import styled from 'styled-components';

export const StyledProduct = styled.div`
  .product {
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 30px 10px;
  }
  
  .product-image {
    width: auto;
    height: 100px;
    margin-top: 15px;
  }

  .product-description {
    position: absolute;
    top: 0;
    left: -12px;
    right: -12px;
    z-index: 1;
    max-height: 50%;
    overflow: auto;
    padding: 15px;
    background-color: #f1f1f1;
    border: 1px solid black;
    box-shadow: 3px 3px 15px #9e9e9e;
  }

  .MuiButton-root {
    margin: 20px 5px 0;
  }

  .MuiPaper-root {
    justify-content: space-between;
  }

  .product-main-image {
    max-width: 350px;
  }
`;
