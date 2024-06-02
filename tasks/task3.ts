// Задание 3: Расширенное использование Generics
// Цель: Разработать несколько функций для обработки и различения типов данных.

// Определите тип данных для описания автомобиля
type Car = {
  company: string;
  model: string;
  year: number;
};

// Определите тип данных для описания велосипеда
type Bike = {
  company: string;
  type: "road" | "mountain";
};

// Создайте Type Guard для проверки, является ли объект автомобилем
function isCar(vehicle: Car | Bike): vehicle is Car {
  return (
    typeof vehicle === "object" &&
    vehicle !== null &&
    typeof vehicle.company === "string" &&
    "model" in vehicle &&
    "year" in vehicle &&
    typeof vehicle.model === "string" &&
    typeof vehicle.year === "number"
  );
}

// Используйте Type Guard в функции, которая печатает информацию о транспорте. Небольшая подсказка о том, какие параметры в себя может принимать isCar дана ниже.
function printVehicleInfo(vehicle: Car | Bike) {
  if (isCar(vehicle)) {
    console.log(`Car: ${vehicle.company} ${vehicle.model} ${vehicle.year}`);
  } else {
    console.log(`Bike: ${vehicle.company} ${vehicle.type}`);
  }
}

///------- пример использования
const vehicle1: Car = {
  company: "Company1",
  model: "Model1",
  year: 2015,
};

const vehicle2: Bike = {
  company: "Company2",
  type: "road",
};

printVehicleInfo(vehicle1);
printVehicleInfo(vehicle2);
