import { Book } from "./book"

export type LibraryMember = {
    name: string,
    memberId: number,
    booksBorrowed: Book[]
}