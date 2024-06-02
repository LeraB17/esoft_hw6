// Задание 2: Расширенное использование Generics
// Цель: Создать универсальную функцию обработки данных, которая может работать с различными типами данных.

// Определите Generic интерфейс Response с одним параметром типа T. Второй параметр status: number
interface CustomResponse<T> {
  data: T;
  status: number;
}

// Реализуйте и типизируйте функцию, которая возвращает объект Response для переданных данных
function createResponse<T>(data: T, status: number): CustomResponse<T> {
  // Реализуйте создание и возврат объекта Response
  return { data, status };
}

// Используйте функцию createResponse для создания ответа с массивом чисел
const numericResponse = createResponse([1, 2, 3, 4, 5], 200);

// Используйте функцию createResponse для создания ответа с объектом пользователя (User)
const meowUser: User = {
  id: 1,
  name: "Meow Meow",
  email: "meow@meow.com",
};
const userResponse = createResponse(meowUser, 200);
