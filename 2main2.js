var students = [
    { name: "Alice", grade: 85, isActive: true },
    { name: "Bob", grade: 92, isActive: false },
    { name: "Charlie", grade: 78, isActive: true },
    { name: "David", grade: 88, isActive: false }
];
function getActiveStudents(students) {
    return students.filter(function (student) { return student.isActive; });
}
console.log(getActiveStudents(students));
