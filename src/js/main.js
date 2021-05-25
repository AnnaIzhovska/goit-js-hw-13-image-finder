import ImagesApiService from './apiService';
import getRefs from './get-refs';
import cardTpl from '../templates/card.hbs';
// import LoadMoreBtn from './load-more-btn';

const refs = getRefs();

// const loadMoreBtn = new LoadMoreBtn({ selector: '[data-action="load-more"]', hidden: true });
const apiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch (e) {
e.preventDefault();
apiService.query = e.currentTarget.elements.query.value;
if (apiService.query === ''){
  return alert('Введите ваш запрос!')  
  }
// loadMoreBtn.show();
apiService.resetPage();
clearArticlesContainer();
feathHits();
};

// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function appendArticlesMarkup(articles) {
    refs.galleryContainer.insertAdjacentHTML('beforeend', cardTpl(articles));
    }

function clearArticlesContainer() {
    refs.galleryContainer.innerHTML = '';
}

function feathHits() {
    // loadMoreBtn.disable();
  
    return apiService.fetchArticles().then(articles => {
    setTimeout(() => {
        appendArticlesMarkup(articles);
        // loadMoreBtn.enable();
      }, 300);
  });
}

// function onLoadMore() {
//   feathHits()
//   .then(
//     setTimeout(() => {
//       window.scrollBy({
//         top: document.documentElement.clientHeight - 80,
//         behavior: 'smooth',
//       });
//     }, 2000),
//   )
//   .catch(err => console.log(err));
// }