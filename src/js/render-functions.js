import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


export function createImageElements(images) {
  return images.map(image => {
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
    captionItemLikes.textContent = `Likes: \n${image.likes}`;

    const captionItem2 = document.createElement('li');
    captionItem2.classList.add('caption-item');
    const captionItemViewses = document.createElement('p');
    captionItemViewses.textContent = `Views: \n${image.views}`;

    const captionItem3 = document.createElement('li');
    captionItem3.classList.add('caption-item');
    const captionItemComments = document.createElement('p');
    captionItemComments.textContent = `Comments: \n${image.comments}`;

    const captionItem4 = document.createElement('li');
    captionItem4.classList.add('caption-item');
    const captionItemDownloads = document.createElement('p');
    captionItemDownloads.textContent = `Downloads: \n${image.downloads}`;

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
}

export function updateGallery(gallery, elements) {
  gallery.innerHTML = '';
  gallery.append(...elements);
}

export function initializeLightbox() {
  return new SimpleLightbox('.gallery a', {
    captions: true, // Увімкнути підписи
    captionSelector: 'img', // Селектор для елемента, з якого брати підпис
    captionType: 'attr', // Тип отримання підпису: 'attr', 'data' або 'text'
    captionsData: 'alt', // Атрибут або data-атрибут, який використовується для отримання підпису
    captionPosition: 'bottom', // Позиція підпису: 'top' або 'bottom'
    captionDelay: 250, // Затримка перед показом підпису
  });
}

export function showErrorToast(message) {
  iziToast.show({
    class: 'promise-message',
    iconUrl: '/goit-js-hw-11/cancel-circle.svg',
    iconColor: 'whte',
    message: message,
    messageColor: 'white',
    messageSize: '18',
    backgroundColor: 'red',
    position: 'topRight',
    class: 'custom-toast',
    icon: 'iziToast-icon',
  });
}
