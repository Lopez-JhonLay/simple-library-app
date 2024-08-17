import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from '../service/book.service';
import { BorrowComponent } from '../borrow/borrow.component';
import { ReturnComponent } from '../return/return.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ReactiveFormsModule, BorrowComponent, ReturnComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  bookForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.bookForm.reset(); 
    this.modal.nativeElement.close();
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

  get imageControl() {
    return this.bookForm.get('image');
  }

  addBook() {
    if (!this.bookForm.valid) return;

    let book = this.bookForm.value;

    const bookDetails = {
      ...book,
      isAvailable: true
    }

    if (this.bookService.insertBook(bookDetails)) {
      this.bookService.alertMessage = `Book "${book.title}" is added.`;
      this.bookService.showAlert = true;

      setTimeout(() => {
        this.bookService.showAlert = false;
      }, 5000);
    }

    this.bookForm.reset();

    this.closeModal();
  }
}
