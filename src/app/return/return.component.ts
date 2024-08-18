import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from '../service/book.service';
import { LibraryMemberService } from '../service/library-member.service';

@Component({
  selector: 'app-return',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './return.component.html',
  styleUrl: './return.component.css'
})
export class ReturnComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  @Input() bookTitle!: string;

  returnForm!: FormGroup

  books = this.bookService.books;

  members = this.memberService.members;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, 
    private memberService: LibraryMemberService) {}

  ngOnInit(): void {
    this.returnForm = this.formBuilder.group({
      member_id: ['', [Validators.required]]
    });
  }

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.returnForm.reset(); 
    this.modal.nativeElement.close();
  }

  get idControl() {
    return this.returnForm.get('member_id');
  }

  returnBook() {
    if (!this.returnForm.valid) return;

    const memberId = this.idControl?.value;

    const member = this.members.find(m => m.member_id === memberId);
    if (!member) {
        alert(`Member with ID ${memberId} is not found.`);
        return;
    }

    const bookIndex = member.books_borrowed.findIndex(b => b.title === this.bookTitle);
    if (bookIndex === -1) {
        alert(`Book "${this.bookTitle}" is not borrowed by member ${memberId}.`);
        return;
    }

    const book = member.books_borrowed[bookIndex];
    book.isAvailable = true;
    member.books_borrowed.splice(bookIndex, 1);
    this.bookService.alertMessage = `Book "${this.bookTitle}" returned by member ${memberId}.`;

    this.bookService.showAlert = true;

    setTimeout(() => {
      this.bookService.showAlert = false;
    }, 5000);
  } 

}
