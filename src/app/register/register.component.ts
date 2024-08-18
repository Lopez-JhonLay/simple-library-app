import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { LibraryMemberService } from '../service/library-member.service';
import { SuccessAlertComponent } from '../success-alert/success-alert.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, SuccessAlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  registerForm!: FormGroup;

  startID = 1;

  constructor(private formBuilder: FormBuilder, private memberService: LibraryMemberService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      course: ['', [Validators.required]],
      year_section: ['', [Validators.required]]
    });
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  get courseControl() {
    return this.registerForm.get('course');
  }

  get yearSectionControl() {
    return this.registerForm.get('year_section');
  }

  openModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.registerForm.reset(); 
    this.modal.nativeElement.close();
  }

  registerMember() {
    if (!this.registerForm.valid) return;

    let name = this.registerForm.value;

    const memberDetails = {
      member_id: this.startID,
      ...name,
      books_borrowed: []
    }

    if (this.memberService.insertMember(memberDetails)) {
      this.memberService.alertMessage = `Member "${this.nameControl?.value}" with ID Number "${this.startID}" is added.`;
      this.memberService.showAlert = true;

      setTimeout(() => {
        this.memberService.showAlert = false;
      }, 5000);
    };

    this.startID++;

    this.registerForm.reset();

    this.closeModal();
  }
}
