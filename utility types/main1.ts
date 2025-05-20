interface Product{
    id: number,
    name: string,
    price: number,
    description?: string
}

const product1: Partial<Product> = {
    id: 1,
    name: "Azim"
}

const product2: Pick<Product, "id" | "name"> = {
    id: 2,
    name: "Akrom"
} 

const product3: Readonly <Product> = {
    id: 3,
    name: "Akbar",
    price: 1000
}

// Readonly property ni ozgartirib bomidi faqat o'qib bo'ladi
// product3.id = 4