export interface CreateProductRequest {
    category: string,
    description: string,
    imageUrl: string,
    name: string,
    price: number,
    stockQuantity: number
}

export interface Product extends CreateProductRequest {
    id: number,
    createdAt: string,
    updatedAt: string
}
