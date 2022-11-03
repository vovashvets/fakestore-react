import { Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/404';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductPage } from './pages/ProductPage';
import React from 'react';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CartItemsState } from './context/CartItems';
import styled from 'styled-components';

const StyledApp = styled.div`
  a {
    text-decoration: none;
    color: #343434;
  }

  a.active {
    color: #1976d2;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export function App() {
  return (
    <StyledApp>
      <CartItemsState>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='products' element={<Products />}/>
            <Route path='product/:id' element={<ProductPage />} />
            <Route path='about' element={<About />}/>
            <Route path='*' element={<NotFound />}/>
          </Route>
        </Routes>
        <Footer />
      </CartItemsState>
    </StyledApp>
  );
}
