import { Book } from "./book"

export type LibraryMember = {
    name: string,
    course: string,
    year_section: string
    member_id: number,
    books_borrowed: Book[]
}