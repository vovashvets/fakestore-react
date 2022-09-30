import React from 'react';
import {Header} from "./components/Header/Header";
import {ProductsContainer} from "./components/ProductList/ProductsList";
import {Sidebar} from "./components/Sidebar/Sidebar";
import {Footer} from "./components/Footer/Footer";
import './App.css';
import {CartItemsState} from "./context/CartItems";

function App() {
  return (
    <CartItemsState>
      <div className='main-container'>
        <div className='header'>
          <Header />
        </div>
        <div className='filters'>
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

export default App;
