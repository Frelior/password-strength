import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordCheckerComponent } from './components/password-checker/password-checker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PasswordCheckerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title: string = 'password-strength';
}
