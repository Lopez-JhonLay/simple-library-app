import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { BookComponent } from './book/book.component';
import { ThemeService } from './service/theme.service';
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { LibraryMemberService } from './service/library-member.service';
import { BookService } from './service/book.service';
import { BookCardComponent } from './book-card/book-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RegisterComponent, BookComponent, BookCardComponent, SuccessAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private themeService: ThemeService, public memberService: LibraryMemberService, public bookService: BookService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentTheme() {
    return this.themeService.getCurrentTheme();
  }
}
