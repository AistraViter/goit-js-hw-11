export const API_KEY = '44002741-2ff50451c0a1667e01f2d5f97';
export const API_URL = 'https://pixabay.com/api/';


// функція повертає відповідь з бекенду у джейсоні або помилку
export function fetchImages(query) { 
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });
  const url = `${API_URL}?${params.toString()}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

