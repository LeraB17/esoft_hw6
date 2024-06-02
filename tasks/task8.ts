// Задание 8: Реализация обобщённой функции для сопоставления и преобразования элементов массива
// Цель: Создать функцию mapAndFilter, которая будет принимать массив объектов, функцию для их преобразования и функцию для фильтрации результатов. Функция должна использовать два параметра Generic: один для типа элементов входного массива, а другой для типа элементов выходного массива.

// Описание задачи: Функция mapAndFilter должна выполнить следующие функции:
// Применить функцию преобразования ко всем элементам входного массива.
// Фильтровать преобразованные элементы с помощью предоставленной функции фильтрации.
// Возвращать новый массив с результатами, которые прошли фильтрацию.
interface Person {
  name: string;
  age: number;
}

interface Adult {
  fullName: string;
  age: number;
}

// Напишите функцию mapAndFilter здесь. Используйте два параметра Generic: T для типа входных данных и U для типа выходных данных.
function mapAndFilter<T, U>(
  items: T[],
  transform: (arg: T) => U,
  filter: (arg: U) => boolean
): U[] {
  return items.map(transform).filter(filter);
}

// Пример данных
const people: Person[] = [
  { name: "Alice", age: 24 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 32 },
];

// Пример использования функции mapAndFilter
const adults: Adult[] = mapAndFilter(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18
);

// Выведите результаты для проверки
console.log(adults);

//Вопросы после реализации:
// Как изменится функция, если необходимо добавить возможность изменения критерия сортировки?
/// - нужно добавить параметр, принимающий функцию для сравнения 2 элементов, и применить её к массиву с помощью sort()
function mapAndFilterAndSort<T, U>(
  items: T[],
  transform: (arg: T) => U,
  filter: (arg: U) => boolean,
  comparator?: (a: U, b: U) => number
): U[] {
  const transformed = items.map(transform).filter(filter);
  if (comparator) {
    transformed.sort(comparator);
  }
  return transformed;
}

// Пример использования функции mapAndFilter
const adults2: Adult[] = mapAndFilterAndSort(
  people,
  (person) => ({ fullName: person.name, age: person.age }),
  (adult) => adult.age >= 18,
  (a, b) => b.age - a.age
);

// Могут ли типы T и U быть полностью разными или должны иметь общие характеристики? Объясните ваш ответ.
/// - могут быть полностью разными, т.к. вся логика преобразования передаётся в функцию извне
