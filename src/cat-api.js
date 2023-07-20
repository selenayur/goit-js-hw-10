

const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_b81K7BzuDEA8swj2RedgfBjdwI60KdZF8WX37AknRgz0KNZAvL9l6pTURqzcmHR9';
               

export function fetchBreeds() {
  return fetch(
    `${BASE_URL}/breeds`
  ).then( resp => {
    if ( !resp.ok ) {
      throw new Error(resp.statusText)
    }  
    return resp.json()
  } )
}

export function fetchCatByBreed( breedId ) {
  return fetch(
    `${BASE_URL}/images/search?limit=10&breed_ids=${breedId}&api_key=${API_KEY}`
  ).then( resp => {
    if ( !resp.ok ) {
      throw new Error(resp.statusText)
    }  
    return (resp.json())
  } )
}