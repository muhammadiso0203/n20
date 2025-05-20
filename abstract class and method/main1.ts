abstract class Shape{
    abstract getArea(): void;
}

class Circle extends Shape{
    radius: number;

    constructor(radius: number){
        super()
        this.radius = radius
    }

    getArea():number{
        return this.radius
    } 
}

class Rectangle extends Shape{
    radius: number;

    constructor(radius: number){
        super()
        this.radius = radius
    }

    getArea():number{
        return this.radius
    } 
}

const circle = new Circle(1.10)
const rectangle = new Rectangle(2.10)
console.log(circle.getArea())
console.log(rectangle.getArea())
