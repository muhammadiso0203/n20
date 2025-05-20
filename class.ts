interface IVehicle{
    brand: string,
    model: string,
    year: number,
    start(): void
};

class Car implements IVehicle{
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    start(): void {
        console.log(`${this.brand}, ${this.model}, ${this.year} ketyapti`);
    }
}

const car = new Car("Toyota", "Corolla", 2020);
car.start();