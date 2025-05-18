type Student = {
   name: string,
   grade: number,
   isActive: boolean
}

let students: Student[] = [
    {name: "Ahror",grade: 10,isActive: true},
    {name: "Zokirshox",grade: 10,isActive: false},
    {name: "Zuhriddin",grade: 10,isActive: true},
    {name: "Nasiba",grade: 10,isActive: false},    
]

function findActiveStudents(listStudents:Student[]): Student[] | null{
   if(listStudents.length === 0){
      return null
   }
   return listStudents.filter(student => student.isActive)
}

console.log(findActiveStudents(students))