import { Book } from "./book"

export type LibraryMember = {
    name: string,
    member_id: number,
    books_borrowed: Book[]
}