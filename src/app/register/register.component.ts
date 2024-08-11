import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { LibraryMemberService } from '../service/library-member.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  isToggle = false;

  registerForm!: FormGroup;

  startID = 1;

  constructor(private formBuilder: FormBuilder, private memberService: LibraryMemberService) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  toggleRegisterForm(): void {
    this.isToggle = !this.isToggle;
  }

  registerMember() {
    if (!this.registerForm.valid) return;

    let name = this.registerForm.value;

    const memberDetails = {
      memberId: this.startID,
      ...name,
      booksBorrowed: []
    }

    this.memberService.insertMember(memberDetails);

    this.startID++;

    this.registerForm.reset();
  }
}
