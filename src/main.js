import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import * as css from "file.css";

var lightbox = new SimpleLightbox('.gallery a',  {
    captions: true, // Увімкнути підписи
    captionSelector: 'img', // Селектор для елемента, з якого брати підпис
    captionType: 'attr', // Тип отримання підпису: 'attr', 'data' або 'text'
    captionsData: 'alt', // Атрибут або data-атрибут, який використовується для отримання підпису
    captionPosition: 'bottom', // Позиція підпису: 'top' або 'bottom'
    captionDelay: 250, // Затримка перед показом підпису
  }); 



const API_KEY = '44002741-2ff50451c0a1667e01f2d5f97';
const API_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const searchField = document.querySelector('#input-search');

const gallery = document.querySelector('ul.gallery');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchField.value.trim();
  if (query !== '') {
    const params = new URLSearchParams({
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
    });

    const url = `${API_URL}?${params.toString()}`;

    loader.style.display = 'block';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.totalHits >= 1) {
          const elements = data.hits.map(image => {
            // Використовуємо data.hits для доступу до зображень
            const li = document.createElement('li');
            li.classList.add('gallery-item');
            const link = document.createElement('a');
            link.classList.add('gallery-link');
            link.href = image.largeImageURL; // Використовуйте правильний URL для посилання
            const img = document.createElement('img');
            img.classList.add('gallery-image');
            img.src = image.webformatURL;
            img.dataset.source = image.largeImageURL;
            img.alt = image.tags;

            const caption = document.createElement('ul');
            caption.classList.add('image-caption');
            const captionItem1 = document.createElement('li');
            captionItem1.classList.add('caption-item');
            const captionItemLikes = document.createElement('p');
            captionItemLikes.textContent=`Likes: \n${image.likes}`

            const captionItem2 = document.createElement('li');
            captionItem2.classList.add('caption-item');
            const captionItemViewses = document.createElement('p');
            captionItemViewses.textContent=`Views: \n${image.views}`
            
            const captionItem3 = document.createElement('li');
            captionItem3.classList.add('caption-item');
            const captionItemComments = document.createElement('p');
            captionItemComments.textContent=`Comments: \n${image.comments}`

            const captionItem4 = document.createElement('li');
            captionItem4.classList.add('caption-item');
            const captionItemDownloads = document.createElement('p');
            captionItemDownloads.textContent=`Downloads: \n${image.downloads}`

            link.append(img);
            captionItem1.append(captionItemLikes);
            captionItem2.append(captionItemViewses);
            captionItem3.append(captionItemComments);
            captionItem4.append(captionItemDownloads);
            caption.append(captionItem1, captionItem2, captionItem3, captionItem4);
            li.append(link);
            li.append(caption);

            return li;
          });


          gallery.innerHTML = ''; // Очищення галереї перед додаванням нових елементів
          gallery.append(...elements); //Розміщення в DOM
          lightbox.refresh();

        
        } else {
          iziToast.show({
            class: 'promise-message',
            iconUrl: '/goit-js-hw-11/cancel-circle.svg',
            iconColor: 'whte',
            message:
              'Sorry, there are no images matching your search query. Please try again!',
            messageColor: 'white',
            messageSize: '18',
            backgroundColor: 'red',
            position: 'topRight',
            class: 'custom-toast',
            icon: 'iziToast-icon',
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        loader.style.display = 'none';
        searchForm.reset(); // Скидання всієї форми
      });
  }
});
