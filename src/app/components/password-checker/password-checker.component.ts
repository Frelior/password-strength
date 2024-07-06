import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  templateUrl: './password-checker.component.html',
  styleUrl: './password-checker.component.scss',
  imports: [ReactiveFormsModule, CommonModule],
})
export class PasswordCheckerComponent implements OnInit {
  public passwordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
  });
  strengthClasses: string[] = ['gray', 'gray', 'gray'];
  errorMessages: {
    short: string;
    easy: string;
    medium: string;
    strong: string;
  } = {
    short: 'Password must be at least 8 characters',
    easy: 'Password is too easy',
    medium: 'Password is medium',
    strong: 'Password is strong',
  };
  currentError: string | null = null;

  ngOnInit(): void {
    this.passwordForm
      .get('password')
      ?.valueChanges.subscribe((password: string) => {
        this.updatePasswordIndicators(password);
      });
  }

  public updatePasswordIndicators(password: string): void {
    if (!password) {
      this.strengthClasses = ['gray', 'gray', 'gray'];
      this.currentError = null;
      return;
    }
    if (password.length < 8) {
      this.strengthClasses = ['red', 'red', 'red'];
      this.currentError = this.errorMessages.short;
      return;
    }

    const hasLetters = /[a-zA-Zа-яА-ЯёЁіІїЇґҐ]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>№;]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.strengthClasses = ['green', 'green', 'green'];
      this.currentError = this.errorMessages.strong;
    } else if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols)
    ) {
      this.strengthClasses = ['yellow', 'yellow', 'gray'];
      this.currentError = this.errorMessages.medium;
    } else {
      this.strengthClasses = ['red', 'gray', 'gray'];
      this.currentError = this.errorMessages.easy;
    }
  }
}
