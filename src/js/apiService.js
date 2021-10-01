const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '23640925-62666e78aedb939489768c224';

const params = 'image_type=photo&orientation=horizontal';
const perPage = 12;

class SearchImages {
  constructor() {
    this._searchQuery = '';
    this.pageNumber = 1;
  }
  getUrl() {
  const url = (`${BASE_URL}/?${params}&q=${this._searchQuery}&page=${this.pageNumber}&per_page=${perPage}&key=${API_KEY}`);
  console.log(url);

  return url;
}

 incrementPage() {
  this.pageNumber += 1
}

 resetPage() {
    this.pageNumber = 1
  }

  get searchQuery() {
    return this._searchQuery
  }

  set searchQuery(newQuery) {
    this._searchQuery = newQuery
  }
}

const newSearchImages = new SearchImages;
export default newSearchImages;