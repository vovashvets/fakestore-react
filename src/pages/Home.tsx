import React from 'react';
import {Header} from "../components/Header/Header";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {Footer} from "../components/Footer/Footer";
import {CartItemsState} from "../context/CartItems";

export const Home = () => {
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

          </div>
          <div className='footer'>
            <Footer />
          </div>
        </div>
      </CartItemsState>
  );
}
