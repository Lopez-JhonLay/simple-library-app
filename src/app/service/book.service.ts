import { Injectable } from '@angular/core';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = []

  insertBook(book: Book) {
    this.books.push(book);

    alert(`Book "${book.title}" is added.`);
  }
}
