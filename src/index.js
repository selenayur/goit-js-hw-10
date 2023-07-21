import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const elements = {
    selectCat: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error')
}



elements.catInfo.classList.add('is-hidden');
elements.loader.classList.replace('is-hidden', 'loader');
elements.error.classList.add("is-hidden");

fetchBreeds()
    .then(data => {
    elements.loader.classList.replace('loader', 'is-hidden');

    console.log(data)
        const listAllCats = data.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
        elements.selectCat.insertAdjacentHTML("beforeend", listAllCats)

    new SlimSelect({
        select: 'elements.selectCat'
    })
})

elements.selectCat.addEventListener('change', onSelectCat);

function onSelectCat(e) {
    elements.loader.classList.replace('is-hidden', 'loader');
    elements.selectCat.classList.remove('is-hidden');
    elements.catInfo.classList.add('is-hidden');
    elements.error.classList.add('is-hidden');

    const breedId = e.target.value;

    fetchCatByBreed(breedId)
        .then(data => {
    elements.loader.classList.replace('loader', 'is-hidden');
    elements.selectCat.classList.remove('is-hidden');
    elements.catInfo.classList.remove('is-hidden')
    elements.error.classList.add('is-hidden');


            let { url, breeds } = data[0];
            console.log(data[0]);
            elements.catInfo.innerHTML = `
        <div class="container-info">
        <img src="${url}" alt="${breeds[0].name}" width="400">
        <div class="text-information">
        <h2 class="title">${breeds[0].name}</h2>
        <p class="description">${breeds[0].description}</p>
        <h3 class="character">Temperament: <span class="text_temp">${breeds[0].temperament}</span></h3>
        </div>
        </div>`
    
        elements.loader.classList.replace('loader', 'is-hidden');
    })
    .catch(onError)
}

function onError(error) {
    elements.loader.classList.replace('loader', 'is-hidden');
    elements.selectCat.classList.remove('is-hidden');
    elements.catInfo.classList.add('is-hidden');
    elements.error.classList.add('is-hidden');


    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        timeout: 4000,
        position: 'center-center',
        width: '500px',
        fontSize: '20px'
    });
}