import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    search: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
}

// refs.search.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));
refs.search.addEventListener('input', onSearch);



function onSearch (evt) {
    const country = evt.target.value.toLowerCase().trim();

    clearCountryList();
    fetchCountries(name)
    .then((countries) => {
        if (countries.length > 10) {
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
        };
        if (countries.length === 1) {
            return createCountryList(countries)
        }

        console.log(countries);
        return countries;
    })
    .then(clearCountryList)
    .catch(onError);
}
let capital = resault[0].capital.join(', ');
let languages = Object.values(resault[0].languages).join(', ');
let res = resault[0];

// функция которая создает разметку
function createCountryList(){
return refs.countryInfo.innerHTML = `<div>
<img class=country-img src='${res.flags.svg}' alt='${res.name.official}' width='50'/>
<h2>${res.name.official}</h2>
</div>
<ul>
<li>
<p>Capital: <span>${capital}<span></p>
</li>
<li>
<p>Population: <span>${res.population}<span></p>
</li>
<li>
<p>Languages: <span>${languages}<span></p>
</li>
</ul>
`;
}

// Если пользователь полностью очищает поле поиска, то HTTP-запрос не выполняется, а разметка списка стран или информации о стране пропадает.
function clearCountryList(){
    refs.countryList.innerHTML = '';
}

// Если пользователь ввёл имя страны которой не существует, бэкенд вернёт не пустой массив, а ошибку со статус кодом 404 - не найдено. Если это не обработать, то пользователь никогда не узнает о том, что поиск не дал результатов. Добавь уведомление "Oops, there is no country with that name" в случае ошибки используя библиотеку notiflix.
function onError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}


