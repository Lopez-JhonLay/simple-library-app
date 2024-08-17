import { BookCategory } from "./book_category"

export type Book = {
    title: string,
    author: string,
    category: BookCategory,
    image: string,
    isAvailable: boolean
}