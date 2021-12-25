class Car {
  _brand;
  _model;
  _yearOfManufacturing;
  _maxSpeed;
  _maxFuelVolume;
  _fuelConsumption;
  _currentFuelVolume = 0;
  _isStarted = false;
  _mileage = 0;

  constructor(brand, model, yearOfManufacturing, maxSpeed, maxFuelVolume, fuelConsumption) {
    this.brand = brand;
    this.model = model;
    this.yearOfManufacturing = yearOfManufacturing;
    this.maxSpeed = maxSpeed;
    this.maxFuelVolume = maxFuelVolume;
    this.fuelConsumption = fuelConsumption;
  }
  
  get brand() {
    return this._brand;
  }
  
  set brand(value) {
    const MAX_VALUE_LENGTH = 50;
    const isIncorrectType = typeof value !== 'string';
    const isIncorrectValue = value.length > MAX_VALUE_LENGTH;

    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Некорректное название бренда');
    }

    this._brand = value;
  }
  
  get model() {
    return this._model;
  }
  
  set model(value) {
    const MAX_VALUE_LENGTH = 50;
    const isIncorrectType = typeof value !== 'string';
    const isIncorrectValue = value.length > MAX_VALUE_LENGTH;

    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Некорректное название модели');
    }

    this._model = value;
  }
  
  get yearOfManufacturing() {
    return this._yearOfManufacturing;
  }
  set yearOfManufacturing(value) {
    const EARLIEST_YEAR = 1900;
    const LATEST_YEAR = new Date().getFullYear();
    const isIncorrectType = typeof value !== 'number';
    const isIncorrectValue = value < EARLIEST_YEAR || value > LATEST_YEAR;

    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Некорректный год выпуска');
    }

    this._yearOfManufacturing = value;
  }
  
  get maxSpeed() {
    return this._maxSpeed;
  }
  set maxSpeed(value) {
    const MINIMUM = 100;
    const MAXIMUN = 300;
    const isIncorrectType = typeof value !== 'number';
    const isIncorrectValue = value < MINIMUM || value > MAXIMUN;

    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Некорректное значение максимальной скорости');
    }

    this._maxSpeed = value;
  }
  
  get maxFuelVolume() {
    return this._maxFuelVolume;
  }
  set maxFuelVolume(value) {
    const MINIMUM = 5;
    const MAXIMUN = 20;
    const isIncorrectType = typeof value !== 'number';
    const isIncorrectValue = value < MINIMUM || value > MAXIMUN;

    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Некорректное значение объёма бака');
    }

    this._maxFuelVolume = value;
  }
  
  get fuelConsumption() {
    return this._fuelConsumption ;
  }
  set fuelConsumption(value) {
    const isIncorrectType = typeof value !== 'number';

    if (isIncorrectType) {
      throw new Error('Некорректное значение расхода топлива');
    }

    this._fuelConsumption = value;
  }

  get currentFuelVolume() {
    return this._currentFuelVolume;
  }

  get isStarted() {
    return this._isStarted;
  }

  get mileage() {
    return this._mileage;
  }

  start() {
    if (this._isStarted) {
      throw new Error('Машина уже заведена');
    }
    this._isStarted = true;
  }

  shutDownEngine() {
    if (!this._isStarted) {
      throw new Error('Машина уже заведена');
    }
    this._isStarted = false;
  }

  fillUpGasTank(litersAmount) {
    const isIncorrectType = typeof litersAmount !== 'number';
    const isIncorrectValue = litersAmount <= 0;
    
    if (isIncorrectType || isIncorrectValue) {
      throw new Error('Неверное количество топлива для заправки');
    }

    if (this._currentFuelVolume + litersAmount > this._maxFuelVolume) {
      throw new Error('Топливный бак переполнен');
    }

    this._currentFuelVolume += litersAmount;
  }

  drive(velocity, hours) {
    const isIncorrectVelocityType = typeof velocity !== 'number';
    const isIncorrectVelocityValue = velocity <= 0;
    
    if (isIncorrectVelocityType || isIncorrectVelocityValue) {
      throw new Error('Неверная скорость');
    }

    const isIncorrectHoursType = typeof hours !== 'number';
    const isIncorrectHoursValue = hours <= 0;
    
    if (isIncorrectHoursType || isIncorrectHoursValue) {
      throw new Error('Неверная количество часов');
    }

    if (velocity > this._maxSpeed) {
      throw new Error('Машина не может ехать так быстро');
    }

    if (!this._isStarted) {
      throw new Error('Машина должна быть заведена, чтобы ехать');
    }

    const route = velocity * hours;
    console.log(`route `, route);
    const fuelNeeded = route / 100 * this._fuelConsumption;
    console.log(`fuelNeeded `, fuelNeeded);

    if (this._currentFuelVolume < fuelNeeded) {
      throw new Error('Недостаточно топлива');
    }

    this._currentFuelVolume -= fuelNeeded;
    this._mileage += route;
  }
}


const auto = new Car(
  'Brand-name',
  'Model-name',
  2021,
  300,
  20,
  3
);

console.log(auto);
auto.start();
console.log(auto.isStarted);
auto.shutDownEngine();
console.log(auto.isStarted);
auto.fillUpGasTank(20);
console.log(auto.currentFuelVolume);
auto.start();
auto.drive(200, 2.5);
console.log(auto);