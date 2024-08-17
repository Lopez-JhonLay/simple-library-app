import { Component } from '@angular/core';
import { BookService } from '../service/book.service';
import { ReturnComponent } from '../return/return.component';
import { BorrowComponent } from '../borrow/borrow.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [ReturnComponent, BorrowComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  books = this.bookService.books;

  constructor(private bookService: BookService) {}
}
