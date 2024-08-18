import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from '../service/book.service';
import { LibraryMemberService } from '../service/library-member.service';

@Component({
  selector: 'app-borrow',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './borrow.component.html',
  styleUrl: './borrow.component.css'
})
export class BorrowComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  @Input() bookTitle!: string;

  borrowForm!: FormGroup

  books = this.bookService.books;

  members = this.memberService.members;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, 
    private memberService: LibraryMemberService) {}

  ngOnInit(): void {
    this.borrowForm = this.formBuilder.group({
      member_id: ['', [Validators.required]]
    });
  }

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.borrowForm.reset(); 
    this.modal.nativeElement.close();
  }

  get idControl() {
    return this.borrowForm.get('member_id');
  }

  borrowBook() {
    if (!this.borrowForm.valid) return;
    
    const book = this.books.find(book => book.title === this.bookTitle 
      && book.isAvailable);
    
    if(!book) {
      alert(`Book "${this.bookTitle}" is not available.`);
      return
    }

    const memberId = this.idControl?.value;

    const member = this.members.find(m => m.member_id === memberId);

    if (!member) {
      alert(`Member with ID ${memberId} is not found.`);
      return;
    }

    book.isAvailable = false;
    member.books_borrowed.push(book);
    this.bookService.alertMessage = `Book "${this.bookTitle}" borrowed by member ${memberId}.`;
    this.bookService.showAlert = true;

    setTimeout(() => {
      this.bookService.showAlert = false;
    }, 5000);
  }
}
