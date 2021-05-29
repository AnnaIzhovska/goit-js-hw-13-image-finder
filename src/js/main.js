import NewsApiService from './apiService';
import temtlateImage from '../templates/card.hbs';
import LoadMoreBtn from './load-more-btn';

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    articlesContainer: document.querySelector('.js-articles-container'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const newApiService = new NewsApiService();


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(e){
    e.preventDefault();

    newApiService.query = e.currentTarget.elements.query.value;

      if (newApiService.query.trim() === '') {
    loadMoreBtn.hide();
    return info({
      text: 'Введите данные для поиска!!!',
      delay: 1500,
      closerHover: true,
    });
  }

    loadMoreBtn.show();
    newApiService.resetPage();
    clearArticlesContainer();
    feathHits();
}

function feathHits() {
    loadMoreBtn.disable();
  
    return newApiService.fetchArticles().then(hits => {
      setTimeout(() => {
        appendHitsMakup(hits);
        loadMoreBtn.enable();
        if (hits.length === 0) {
          loadMoreBtn.hide();
          error({
            text: 'По запросу нет результата!',
            delay: 1500,
            closerHover: true,
          });
        }
      }, 300);
    });
  }
  
  function onLoadMore() {
    feathHits()
      .then(
        setTimeout(() => {
            window.scrollTo({
                top: refs.articlesContainer.clientHeight + 100,
                behavior: 'smooth',
              });
            }, 500)
      )
      .catch(err => console.log(err));
  }

function appendHitsMakup(hits) {
    refs.articlesContainer.insertAdjacentHTML('beforeend', temtlateImage(hits));
     
 }
 
 function clearArticlesContainer() {
     refs.articlesContainer.innerHTML = '';
 }