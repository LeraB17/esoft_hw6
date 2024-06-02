// Задание 4: Использование Utility Types для работы с интерфейсами
// Цель: Модифицировать интерфейсы для специфических нужд без изменения оригинальных интерфейсов.

// Определите интерфейс Employee
interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

// Используйте Utility Type для создания типа, который делает все свойства Employee опциональными
type PartialEmployee = Partial<Employee>;

// Используйте Utility Type для создания типа, который делает все свойства Employee доступными только для чтения
type ReadonlyEmployee = Readonly<Employee>;

// Создайте функцию, которая принимает PartialEmployee и выводит информацию о сотруднике
function printEmployeeInfo(employee: PartialEmployee): void {
  const { id, name, department, email } = employee;

  let info = "Employee Info:\n";
  info +=
    `ID: ${id || "Unknown"}\n` +
    `Name: ${name || "Unknown"}\n` +
    `Department: ${department || "Unknown"}\n` +
    `Email: ${email || "Unknown"}\n`;

  console.log(info);
}

///------- пример использования
const employee1: PartialEmployee = {
  id: 1,
  name: "Bob",
  email: "bob23456789@gmail.com",
};

const employee2: PartialEmployee = {
  id: 2,
  name: "Alice",
  department: "Office 1",
};

printEmployeeInfo(employee1);
printEmployeeInfo(employee2);
