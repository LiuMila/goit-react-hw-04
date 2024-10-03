
export async function fetchImg(name, page) {
  // Параметри для запиту
  const searchParams = new URLSearchParams({
    key: '36788641-8cf00dcd24f2681e40d99dde8',
    q: name,
    page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const URL = 'https://pixabay.com/api/';

  try {
    const response = await fetch(`${URL}?${searchParams.toString()}`);

    if (!response.ok) {
      throw new Error(`Помилка: ${response.status} ${response.statusText}`);
    }

    // Отримання даних
    const data = await response.json();

    // Перевірка, чи містить відповідь потрібну інформацію
    if (!data.hits || data.hits.length === 0) {
      throw new Error('Зображення не знайдені за заданими параметрами.');
    }

    return data;
  } catch (error) {
    console.error('Error fetching images:', error);

    throw error;
  }
}
