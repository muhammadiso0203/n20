;
var Car = /** @class */ (function () {
    function Car(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    Car.prototype.start = function () {
        console.log("".concat(this.brand, ", ").concat(this.model, ", ").concat(this.year, " ketyapti"));
    };
    return Car;
}());
var car = new Car("Toyota", "Corolla", 2020);
car.start();
