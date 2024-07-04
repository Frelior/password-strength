import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-checker',
  standalone: true,
  templateUrl: './password-checker.component.html',
  styleUrl: './password-checker.component.scss',
  imports: [ReactiveFormsModule],
})
export class PasswordCheckerComponent {
  public passwordForm: FormGroup = new FormGroup({
    password: new FormControl(''),
  });

  public class = 'green';

  public log() {
    console.log(this.passwordForm.value);
  }
}
