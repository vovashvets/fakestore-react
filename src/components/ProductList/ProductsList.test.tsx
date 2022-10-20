import { render, screen } from '@testing-library/react';
import { ProductsList } from "./ProductsList";
import {BrowserRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
//
// function renderProductsList() {
//   render(
//     <BrowserRouter>
//       <ProductsList />
//     </BrowserRouter>
//   )
// }
//
// describe('Product list tests', () => {
//   test('Products found test', () => {
//     renderProductsList();
//
//     setTimeout(() => {
//       expect(screen.getByText('Products found: 20')).toBeInTheDocument();
//     }, 2000)
//   })
//
//   test('Test search by title', () => {
//     renderProductsList();
//
//     //   expect(screen.getByText('DANVOUY Womens T Shirt Casual')).toBeNull();
//     //   expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
//     //
//     //   userEvent.type(screen.getByRole('textbox'), 'mettns');
//     //   expect(screen.getByText('DANVOUY Womens T Shirt Casual')).toBeInTheDocument();
//   })
// })