abstract class Shape{
    getArea(): number{
        return 0;
    }
}

class Circle extends Shape{
    radius: number;
    constructor(radius: number){
        super();
        this.radius = radius;
    }
    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape{
    width: number;
    height: number;
    constructor(width: number, height: number){
        super();
        this.width = width;
        this.height = height;
    }
    getArea(): number {
        return this.width * this.height;
    }
}

console.log("Circle area: ", new Circle(5).getArea());
console.log("Rectangle area: ", new Rectangle(5, 10).getArea());
