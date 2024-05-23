import { fetchImages } from './js/pixabay-api';
import {
  createImageElements,
  updateGallery,
  initializeLightbox,
  showErrorToast,
} from './js/render-functions';

//querySelectors
const searchForm = document.querySelector('.search-form');
const searchField = document.querySelector('#input-search');
const gallery = document.querySelector('ul.gallery');

//loader is created
const loader = document.createElement('div');
loader.classList.add('loader');
loader.style.display = 'none';
document.body.appendChild(loader);


//SEARCH FORM
searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = searchField.value.trim();
  if (query !== '') {
    loader.style.display = 'block';

    fetchImages(query) // прихід з бекенду у джейсоні
      .then(data => {
        if (data.totalHits >= 1) {
          const elements = createImageElements(data.hits);
          updateGallery(gallery, elements);
          let lightbox = initializeLightbox();
          lightbox.refresh();
        } else {
          showErrorToast(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        }
      })
      .catch(error => {
        showErrorToast(
          'An error occurred while fetching the images. Please try again!'
        );
        console.log(error);
      })
      .finally(() => {
        loader.style.display = 'none';
        searchForm.reset(); // Скидання всієї форми
      });
  }
});
