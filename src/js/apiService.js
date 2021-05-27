const API_KEY = '21713789-8b1a276c02e035b978d6c9e58';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles() {
        
          const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

    return fetch(url)
        .then(response => response.json())
       .then(({ hits })=> {
        //    console.log(data);
           this.increementPage();
        //    console.log(this);
           return hits;
        });
    }
    increementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
