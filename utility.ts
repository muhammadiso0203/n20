interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

function updateProduct(
    product: Product,
    updates: Partial<Pick<Product, "name" | "price">>
): Product {
    return { ...product, ...updates };
}

const product2: Pick<Product, "id" | "name"> = {
    id: 2,
    name: "second"
};

const product3: Readonly<Product> = {
    id: 3,
    name: "third",
    price: 3
};


const updatedProduct3 = { ...product3, description: "Yangilangan izoh" };
console.log(updatedProduct3);
