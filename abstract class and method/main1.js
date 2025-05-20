"use strict";
class Shape {
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getArea() {
        return this.radius;
    }
}
class Rectangle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getArea() {
        return this.radius;
    }
}
const circle = new Circle(1.10);
const rectangle = new Rectangle(2.10);
console.log(circle.getArea());
console.log(rectangle.getArea());
//# sourceMappingURL=main1.js.map