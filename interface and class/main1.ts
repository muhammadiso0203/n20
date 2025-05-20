interface Vehicle{
    brand: string,
    model: string,
    year: number,

    start:() => void;
}

class Car implements Vehicle{
    brand : string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number){
       this.brand = brand
       this.model = model
       this.year = year
    }

    start():void{
        console.log(`${this.brand} ${this.model} ${this.year}`)
    }

}

const vehicle1 = new Car("Chevrolet","Cobalt",2020)
const vehicle2 = new Car("BMW","Version 1",2024)
const vehicle3 = new Car("BYD","BYD +",2025)
vehicle1.start()
vehicle2.start()
vehicle3.start()
