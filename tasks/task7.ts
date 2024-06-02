// Задание 7: Работа с обобщённой функцией поиска в массиве
// Цель: Создать функцию, которая может искать элементы в массиве по разным критериям, включая составные типы и условия с использованием нескольких параметров в Generics.
interface User {
  id: number;
  name: string;
  age: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Book {
  isbn: string;
  title: string;
  author: string;
}

// Разберитесь с типизацией функции и поймите как она работает.
// Как можно улучшить функцию findInArray, чтобы она обрабатывала случаи, когда ключ или значение отсутствуют?
// Можно ли использовать эту функцию для поиска по нескольким ключам одновременно? Если да, как бы вы это реализовали?
function findInArray<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T | undefined {
  return items.find((item) => item[key] === value);
}

/// улучшенная версия для поиска по нескольким ключам (+ проверка наличия ключа в объекте, если нет - исключение)
function findInArrayImproved<T extends object, K extends keyof T>(
  items: T[],
  searchParams: Record<K, T[K]>
): T | undefined {
  return items.find((item) => {
    return Object.entries(searchParams).every(([key, value]) => {
      if (key in item) {
        return item[key as K] === value;
      } else {
        throw new Error(`invalid field: ${key}`);
      }
    });
  });
}

// Данные для тестирования функции
const users: User[] = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
];

const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 500 },
];

const books: Book[] = [
  { isbn: "12345", title: "The TypeScript Handbook", author: "Someone" },
  { isbn: "67890", title: "Learning TypeScript", author: "Another One" },
];

// 1. Найдите пользователя по имени "Alice".
const foundUser = findInArray(users, "name", "Alice");
// 2. Найдите продукт с ценой 500.
const foundProduct = findInArray(products, "price", 500);
// 3. Найдите книгу по автору "Another One".
const foundBook = findInArray(books, "author", "Another One");

// 1.1. Найти пользователя по имени "Alice" и по возрасту 25.
const foundUser2 = findInArrayImproved(users, { name: "Alice", age: 25 });
// 1.2. Найти пользователя по имени "Alice" и по email "alice@example.com" (несуществующее поле => исключение).
const foundUser3 = findInArrayImproved(users, {
  name: "Alice",
  email: "alice@example.com",
});
// 2. Найти продукт с ценой 500 и именем "Laptop".
const foundProduct2 = findInArrayImproved(products, {
  price: 500,
  name: "Laptop",
});
// 3. Найти книгу по автору "Another One" и isbn: 67890 (не тот тип поля => ничего не найдётся).
const foundBook2 = findInArrayImproved(books, {
  author: "Another One",
  isbn: 67890,
});
