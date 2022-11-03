import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders home page title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const title = screen.getByText(/Home page/i);
  expect(title).toBeInTheDocument();
});
