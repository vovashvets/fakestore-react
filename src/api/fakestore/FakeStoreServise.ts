import {API_ENDPOINT_CATEGORIES, API_ENDPOINT_PRODUCTS, DEFAULT_PRODUCTS_AMOUNT, API_ENDPOINT_PRODUCT} from "../../config";

export function getFakeProducts(number: number = 0) {
  let url = API_ENDPOINT_PRODUCTS;

  if (number === 0) {
    url += DEFAULT_PRODUCTS_AMOUNT;
  } else {
    url += number;
  }

  return (
    fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
  )
}

export function getFakeProduct(id: number) {
  if (id !== 0) {
    return (
      fetch(API_ENDPOINT_PRODUCT + id)
        .then(response => {
          if(response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {
          console.log(networkError.message);
        })
    )
  }
}

export function getFakeCategories() {
  return (
    fetch(API_ENDPOINT_CATEGORIES)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => {
        console.log(networkError.message);
      })
  )
}