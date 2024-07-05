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
      return;
    }
    if (password.length < 8) {
      this.strengthClasses = ['red', 'red', 'red'];
      return;
    }

    const hasLetters = /[a-zA-Zа-яА-ЯёЁіІїЇґҐ]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasLetters && hasDigits && hasSymbols) {
      this.strengthClasses = ['green', 'green', 'green'];
    } else if (
      (hasLetters && hasDigits) ||
      (hasLetters && hasSymbols) ||
      (hasDigits && hasSymbols)
    ) {
      this.strengthClasses = ['yellow', 'yellow', 'gray'];
    } else {
      this.strengthClasses = ['red', 'gray', 'gray'];
    }
  }
}
