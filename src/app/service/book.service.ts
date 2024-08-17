import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { BookCategory } from '../../models/book_category';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];

  showAlert = false;

  alertMessage = '';

  insertBook(book: Book): boolean {
    this.books.push(book);
    
    return true;
  }
}
