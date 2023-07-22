import axios from "axios";

axios.defaults.headers.common["x-api-key"] = 'live_b81K7BzuDEA8swj2RedgfBjdwI60KdZF8WX37AknRgz0KNZAvL9l6pTURqzcmHR9';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREEDS = 'breeds';
const END_POINT_SEARCH = 'images/search';

export  function fetchBreeds() {
    return axios.get(`${BASE_URL}${END_POINT_BREEDS}`);    
};
export function fetchCatByBreed(breedId) {
    const url = `${BASE_URL}${END_POINT_SEARCH}?breed_ids='${breedId}'`
    return axios.get(`${BASE_URL}${END_POINT_SEARCH}?breed_ids=${breedId}`);
}
