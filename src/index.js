
//axios.defaults.headers.common["x-api-key"] = "live_b81K7BzuDEA8swj2RedgfBjdwI60KdZF8WX37AknRgz0KNZAvL9l6pTURqzcmHR9";
//import axios from "axios";
import { fetchBreeds } from "./cat-api";
import { fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import Notiflix from 'notiflix';

const selectInputEl = document.querySelector( '.breed-select' );
const catItemEl = document.querySelector( '.cat-info' );
const loaderEl = document.querySelector( '.loader' );

selectInputEl.addEventListener( 'change', checkInput );

let allCatsArray = {};

fetchBreeds().then( data => {
  allCatsArray = data;
  getValuesToInput( allCatsArray );
  loaderEl.classList.add( 'hidden' );
} ).catch( err => {
  Notiflix.Notify.failure( 'Oops! Something went wrong! Try reloading the page!' );
  selectInputEl.innerHTML = `<option value='noInfo'>No info from server</option>`
  loaderEl.classList.add( 'hidden' );
}
);

function getValuesToInput( array ) {
  let markup = [];
  array.map( ( element ) => {
    markup.push(`<option value=${element.id}>${element.name}</option>`)
  } );
  selectInputEl.innerHTML = markup.join( ' ' );
  addSlimSelect();
}

function addSlimSelect() {
  new SlimSelect({
    select: '#selectElement'
  })
}

function checkInput( event ) {
  loaderEl.classList.remove( 'hidden' );
  fetchCatByBreed( event.target.value )
    .then( data => {
      let dataInfo = data[0].breeds[0];
      createCatMarkup( data, dataInfo );
      loaderEl.classList.add( 'hidden' );
    } ).catch( err => {
      Notiflix.Notify.failure( 'Oops! Something went wrong! Try reloading the page!' );
      catItemEl.innerHTML = '';
      loaderEl.classList.add( 'hidden' );
    } );
}

function createCatMarkup(data, dataInfo) {
  catItemEl.innerHTML = `<img class="cat-img" src=${data[0].url} alt=${dataInfo.name} width=500/>
  <div class="info-wrapper">
    <h2>${dataInfo.name}</h2>
    <p>${dataInfo.description}</p>
      <p>
        <span>Temperament:</span>
        ${dataInfo.temperament}
      </p>
    </div>`;      
}