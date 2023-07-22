import { fetchBreeds, fetchCatByBreed }  from './cat-api'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
const refs = {
    selected: document.querySelector('.breed-select'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
    div: document.querySelector('.cat-info'),
    option: document.querySelector('.breed-select option')
}
refs.selected.classList.add('hidden');
refs.option.setAttribute('selected', 'selected');
refs.option.setAttribute('disabled', 'disabled');
refs.option.textContent = 'Please selected breeds cat';
refs.selected.setAttribute("id", "slim-select");
refs.selected.addEventListener('change', onSelect);

function onSelect(event) {
    refs.loader.classList.remove('hidden');
     refs.div.innerHTML = "";
    fetchCatByBreed(event.target.value)
         .then((response) => {
             makeMarkCard(response.data[0].breeds[0], response.data[0]);
           refs.loader.classList.add('hidden'); 
         }).catch((error) => {
            Notiflix.Notify.failure('Error getting data. Please try again later.');
            refs.loader.classList.add('hidden');

        }).finally(); 


};

fetchBreeds().then((response) => {
   
    makeMarkOptions(response.data)
     new SlimSelect({
            select: '#slim-select',
    
     });
    refs.selected.classList.remove('hidden');
    refs.loader.classList.add('hidden');
        }).catch((error) => {
        Notiflix.Notify.failure('Error getting data. Please try again later.');
            refs.loader.classList.add('hidden');
        }).finally(); 


function makeMarkOptions(arr) {
    return arr.forEach(({name, id}) => {
    let markUp = `<option value="${id}">${name}</option>`;
    refs.selected.insertAdjacentHTML('beforeend', markUp);
     
    });
      
};

function makeMarkCard({name, description, temperament}, {url}) {
    let markUp = `
    <img src="${url}" alt="${name}" width="460px"/>
    <div class="descrp-card">
    <p class="title-card">${name}</p>
    <p class="description">${description}</p>
    <p class="temerament">${temperament}</p>
    </div>`;
    
    refs.div.innerHTML = markUp;
}