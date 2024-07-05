import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordCheckerComponent } from './password-checker.component';

describe('PasswordCheckerComponent', () => {
  let component: PasswordCheckerComponent;
  let fixture: ComponentFixture<PasswordCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PasswordCheckerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set indicators to gray when password is empty', () => {
    component.passwordForm.get('password')?.setValue('');
    fixture.detectChanges();
    expect(component.strengthClasses).toEqual(['gray', 'gray', 'gray']);
  });

  it('should set indicators to red when password is less than 8 characters', () => {
    component.passwordForm.get('password')?.setValue('123456');
    fixture.detectChanges();
    expect(component.strengthClasses).toEqual(['red', 'red', 'red']);
  });

  it('should set indicators to green when password is strong', () => {
    component.passwordForm.get('password')?.setValue('Strong@123');
    fixture.detectChanges();
    expect(component.strengthClasses).toEqual(['green', 'green', 'green']);
  });

  it('should set indicators to yellow when password is medium', () => {
    component.passwordForm.get('password')?.setValue('12345678Yes');
    fixture.detectChanges();
    expect(component.strengthClasses).toEqual(['yellow', 'yellow', 'gray']);
  });

  it('should set indicators to red when password is easy', () => {
    component.passwordForm.get('password')?.setValue('12345678');
    fixture.detectChanges();
    expect(component.strengthClasses).toEqual(['red', 'gray', 'gray']);
  });
});
