// Форматирование цены
export function formatPrice(value) {
  return Number(value).toLocaleString('ru-RU');
}

// Форматирование телефона: +7 (978) 70 20 100
export function formatPhone(raw) {
  if (!raw) return '';

  // Оставляем только цифры
  let digits = String(raw).replace(/\D/g, '');

  // Если номер начинается с 8 или 7, отсекаем первую цифру для единого формата
  if (digits.startsWith('7') || digits.startsWith('8')) {
    digits = digits.slice(1);
  }

  // Ограничиваем 10 цифрами после кода страны (+7)
  digits = digits.slice(0, 10);

  let formatted = '+7';

  if (digits.length > 0) {
    formatted += ` (${digits.slice(0, 3)}`;
  }
  if (digits.length >= 3) {
    formatted += `) ${digits.slice(3, 5)}`;
  } else if (digits.length > 0 && digits.length < 3) {
    // пока скобка открыта
  }
  if (digits.length >= 5) {
    formatted += ` ${digits.slice(5, 7)}`;
  }
  if (digits.length >= 7) {
    formatted += ` ${digits.slice(7, 10)}`;
  }

  return formatted;
}
