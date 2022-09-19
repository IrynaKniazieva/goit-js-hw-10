import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    search: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
    
}

refs.search.addEventListener('input', debounce (onSearch, DEBOUNCE_DELAY));



function onSearch (evt) {
    evt.preventDefault()
    const searchCountry = evt.target.value.trim();
   
    clearCountryInfo();
    clearCountryList();

    fetchCountries(searchCountry)
        .then(countries => {
            if (countries.length > 10) {
                    Notiflix.Notify.info(
                  'Too many matches found. Please enter a more specific name.'
                );
              } else if (countries.length > 2 && countries.length < 10) {
                createCountryList(countries)
             } else {
                createCountryInfo(countries)
              }
        })
        .catch(onError);
    }  


// функция для названия страны и флага
function createCountryList(countries) {
    const countryList = countries.map(country => {
        return `<li class=country-item>
        <img src='${country.flags.svg}' alt='${country.name.official}' width='50' height ='50'/>
        <h2 class=country-name> ${country.name.official}</h2>
        </li>`;
    }).join('');

    refs.countryList.innerHTML = countryList;
    // console.log(createCountryList);
}

// функция которая создает разметку для инфо страны
function createCountryInfo(countries) {
    const countryInfo = countries.map(country => {
        return `<div class=country>
        <img src='${country.flags.svg}' alt='${country.name.official}' width='50' height ='50'/>
        <h2 class=country-name> ${country.name.official}</h2>
        </div>
        <ul>
        <li class=country-item>
        <p class=country-item__article>Capital: <span class=country-item__span>${country.capital}<span></p>
        </li>
        <li class=country-item>
        <p class=country-item__article>Population: <span class=country-item__span>${country.population}<span></p>
        </li>
        <li class=country-item>
        <p class=country-item__article>Languages: <span class=country-item__span>${Object.values(country.languages).join('')}<span></p>
        </li>
        </ul>`;
    }).join('');

// вешаем разметку
    refs.countryInfo.innerHTML = countryInfo;
    // console.log(createCountryInfo);
}


// // Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
function clearCountryInfo(){
    refs.countryInfo.innerHTML = '';
}


// // Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка для названия страны и флага пропадает
function clearCountryList(){
    refs.countryList.innerHTML = '';
}

// Если пользователь ввёл имя страны которой не существует
function onError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}


