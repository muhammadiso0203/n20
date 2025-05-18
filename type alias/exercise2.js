"use strict";
let students = [
    { name: "Ahror", grade: 10, isActive: true },
    { name: "Zokirshox", grade: 10, isActive: false },
    { name: "Zuhriddin", grade: 10, isActive: true },
    { name: "Nasiba", grade: 10, isActive: false },
];
function findActiveStudents(listStudents) {
    if (listStudents.length === 0) {
        return null;
    }
    return listStudents.filter(student => student.isActive);
}
console.log(findActiveStudents(students));
//# sourceMappingURL=exercise2.js.map