import {API_ENDPOINT, DEFAULT_PRODUCTS_AMOUNT} from "./index";

export function getFakeProducts(number: number = 0) {
  let url = API_ENDPOINT;

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