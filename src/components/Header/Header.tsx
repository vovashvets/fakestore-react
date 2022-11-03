import React from 'react';
import { Cart } from '../Cart/Cart';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  padding: 10px 30px;
  background: #f3f3f3;
  box-shadow: 1px 1px 5px #d1d1d1;

  .main-nav{
    display: flex;
    align-items: baseline;
    gap: 25px;
  }
`;

export function Header() {
  return (
    <StyledHeader>
      <div className='main-nav'>
        <h3>
          {/* 'end' - makes link active only on home page */}
          <NavLink to='/' end>Fake store</NavLink>
        </h3>
        <NavLink to='/products'>Products</NavLink>
        <NavLink to='/about'>About</NavLink>
      </div>
      <Cart />
    </StyledHeader>
  );
}
