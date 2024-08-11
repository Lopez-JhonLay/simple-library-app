import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  isToggle = false;

  books = this.bookService.books;

  bookForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });
  }

  get titleControl() {
    return this.bookForm.get('title');
  }

  get authorControl() {
    return this.bookForm.get('author');
  }

  get categoryControl() {
    return this.bookForm.get('category');
  }

  toggleAddBookForm(): void {
    this.isToggle = !this.isToggle;
  }

  addBook() {
    if (!this.bookForm.valid) return;

    let book = this.bookForm.value;

    const bookDetails = {
      ...book,
      isAvailable: false
    }

    this.bookService.insertBook(bookDetails);

    this.bookForm.reset();

    console.log(bookDetails);
    
  }
}
