export interface IProduct  {
    id: number,
    title: string,
    price: number
}

export interface ICartProduct {
    product: IProduct,
    quantity: number
}

export type OrderProduct = {
    product_id: number,
    quantity: number
}