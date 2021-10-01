import refs from './refs';
import API from './apiService';
import imageCardMarkup from '../templates/imageCardMarkup.hbs';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.style.display= "none";

// import { debounce } from 'lodash';
import { Notify, Loading } from 'notiflix';

const { success, warning, failure, info } = Notify;

function onSearch(evt) {
  evt.preventDefault();
  const value = evt.currentTarget.elements.query.value;
  console.log(value);
  if (value === '') {
    info('Введите запрос');
    return 
  }
  
  // Присвоили сеттер
  API.searchQuery = value;

  // на первую загрузку возвращ к первой стр нового запроса
  API.resetPage();
  const url = API.getUrl();
  console.log(url);

  const respons = fetch(url).then(res => res.json()).then(data => {
    console.log(data.hits)

    if (data.hits.length === 0) {
      warning('Введите корректный запрос');
      return
    }

    const markup = imageCardMarkup(data.hits);

    refs.galleryList.innerHTML = markup;
    refs.loadMoreBtn.style.display = "inline-block";
    success('Ваш запрос успешно найден!)');

    // вызываем метод
    API.incrementPage();
  }).catch(error => {
    console.log(error);
    failure('Такого запроса не найдено!');
  });
}

function onLoadMore() {
  const url = API.getUrl();
  console.log(url);

  const respons = fetch(url).then(res => res.json()).then(data => {
    console.log(data.hits)

    const markup = imageCardMarkup(data.hits);
    refs.galleryList.insertAdjacentHTML('beforeend', markup);

    // вызываем метод
    API.incrementPage();

    const element = document.getElementById((data.hits[0].id)
    );
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
});
  }).catch(error => {
    console.log(error);
    failure('Такого запроса не найдено!');
  });
}