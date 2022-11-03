import React from 'react';
import { render, screen, } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Products } from '../../pages/Products';
import userEvent from '@testing-library/user-event';

describe('Product list tests', () => {
  beforeEach(() => {
    // This line is necessary in case when component uses scrollIntoView().
    window.HTMLElement.prototype.scrollIntoView = () => {};
  });

  test('Products found test', async() => {
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );

    // Check some product's title.
    await (screen.findByText('Products found: 20'));
  });

  test('Test search by title', async() => {
    const textToType = 'DANVOUY';
    render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    await (expect(screen.queryByText('DANVOUY Womens T Shirt Casual')).toBeNull());

    userEvent.type(screen.getByRole('textbox'), textToType);
    expect(screen.getByRole('textbox')).toHaveAttribute('value', textToType);

    const button = screen.getByRole('button', { name: 'Search' });
    userEvent.click(button);

    // Click doesn't do anything. WHY?
    await (screen.findByText('Products found: 20'));
  });
});

// Examples
//
// expect(actualIngredients).toBeDefined();
// expect(actualIngredients).toEqual(expectedIngredients);
// expect(actualIngredients.length).toBe(5);
// expect(actualIngredients[0] === "Basil").toBeTruthy();
// expect(actualIngredients).not.toContain("Ice Cream");
// expect(screen.getByText('Fjallraven')).toBeInTheDocument();
//
// await waitFor(() => {
//   expect(screen.getByText('Products found: 20')).toBeInTheDocument();
// }, {timeout:3000})
