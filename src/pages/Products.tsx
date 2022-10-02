import React from 'react';
import {Header} from "../components/Header/Header";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {Footer} from "../components/Footer/Footer";
import {CartItemsState} from "../context/CartItems";
import {ProductsContainer} from "../components/ProductList/ProductsList";

export const Products = (props: any) => {
  return (
    <CartItemsState>
      <div className='main-container'>
        <div className='header'>
          <Header />
        </div>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='main-section'>
          <ProductsContainer />
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </CartItemsState>
  );
}
