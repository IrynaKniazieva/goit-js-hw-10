import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
    search: document.querySelector('#search-box'),
    countryInfo: document.querySelector('.country-info'),
}

// refs.search.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));
refs.search.addEventListener('input', onSearch);



function onSearch (evt) {
    const country = evt.target.value.toLowerCase();

// const filteredItems = fetchCountries .filter(t => t.label.toLowerCase().includes(filter),);

console.log(filteredItems);

    // evt.preventDefault();

    // fetchCountries()
}

// функция которая создает разметку
function createCountryList(countries){
return refs.countryInfo.innerHTML = `<div>
<img class=country-img src='${countries.flags.svg}' alt='${countries.name.official}' width='50'/>
<h2>${countries.name.official}</h2>
</div>
<ul>
<li>
<p>Capital: <span>${countries.capital}<span></p>
</li>
<li>
<p>Population: <span>${countries.population}<span></p>
</li>
<li>
<p>Languages: <span>${countries.languages}<span></p>
</li>
</ul>
`;
}
