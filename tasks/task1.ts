//Разминка
// Определите интерфейс для пользователя
interface User {
  id: number;
  name: string;
  // Добавьте свойство email типа string
  email: string;
}

// Определите интерфейс для активности пользователя
interface Activity {
  userId: number;
  activity: string;
  // Добавьте свойство timestamp типа Date
  timestamp: Date;
}

// Реализуйте функцию fetchData используя Generic. Функция должна возвращать Promise.
async function fetchData<T>(url: string): Promise<T> {
  // Реализуйте получение данных с использованием fetch и возвращение их в формате json
  const res = fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Fetch error: ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  });

  return res;
}

///------- пример использования
(async () => {
  try {
    const userData = await fetchData<User>(
      "https://jsonplaceholder.typicode.com/users/1"
    );
    console.log("User data:", userData);
  } catch (error: any) {
    console.error("Error in fetching user data:", error.message);
  }
})();

// Используйте Utility Types для создания Partial и Readonly версий User и Activity
type PartialUser = Partial<User>;
type ReadonlyActivity = Readonly<Activity>;

//Типизируйте функцию. userId - число
function getUserActivities(userId: number): Promise<Activity[]> {
  return fetchData<Activity[]>(`/api/activities/${userId}`);
}
// Используйте ReturnType для создания типа возвращаемого значения функции getUserActivities
type ActivitiesReturnType = ReturnType<typeof getUserActivities>;

// Используйте extends в условных типах для создания типа Permissions
type AdminPermissions = { canBanUser: boolean };
type BasicPermissions = { canEditProfile: boolean };
// Заполните тип. Должен выявляться на основне некоторого дженерика и определять, какой из пермишенов выдавать: Admin или Basic.
type UserPermissions<T> = T extends "admin"
  ? AdminPermissions
  : BasicPermissions;

///ЧАСТЬ 2.

// Определите Type Alias для Union типа String или Number
type StringOrNumber = string | number;

// Реализуйте функцию logMessage, которая принимает StringOrNumber и не возвращает значение (void)
function logMessage(message: StringOrNumber): void {
  // Реализуйте вывод сообщения в консоль
  console.log(`LogMessage: ${message}`);
}

// Реализуйте функцию throwError, которая никогда не возвращает управление (never)
function throwError(errorMsg: string): never {
  // Бросьте исключение с errorMsg
  throw new Error(errorMsg);
}

// Реализуйте Type Guard для проверки, является ли значение строкой
function isString(value: StringOrNumber): value is string {
  // Верните результат проверки типа
  return typeof value === "string";
}

// Реализуйте функцию assertIsNumber, которая использует asserts для утверждения типа number
function assertIsNumber(value: any): asserts value is number {
  // Бросьте исключение, если значение не является числом
  if (typeof value !== "number") {
    throw throwError(`Expected number, got ${typeof value}`);
  }
}

// Завершите функцию processValue, используя isString и assertIsNumber
function processValue(value: StringOrNumber): void {
  // Реализуйте логику проверки и обработки значения
  if (isString(value)) {
    logMessage(`${value.toUpperCase()} is string`);
  } else {
    assertIsNumber(value);
    logMessage(`${value.toFixed(2)} is number`);
  }
}
