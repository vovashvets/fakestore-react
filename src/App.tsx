import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {NotFound} from './pages/404'
import {About} from './pages/About'
import {Home} from './pages/Home'
import {Products} from './pages/Products'
import './App.css';
import {ProductPage} from "./pages/ProductPage";
import React from "react";


export function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='products' element={<Products />}/>
        <Route path='product/:id' element={<ProductPage />} />
        <Route path='about' element={<About />}/>
        <Route path='*' element={<NotFound />}/>
      </Route>
    </Routes>
  );
}
