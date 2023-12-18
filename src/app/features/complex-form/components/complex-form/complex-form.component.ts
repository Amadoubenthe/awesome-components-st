import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable, map, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form/complex-form.service';
import { ComplexFormValue } from '../../models/complex-form-value.model';
import { confirmEqualValidator } from '../../validators/confirm-equal-validator';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss'],
})
export class ComplexFormComponent {
  loading: boolean = false;
  mainForm!: FormGroup;

  personalInfoForm!: FormGroup;

  contactPreferenceCtrl!: FormControl;

  emailForm!: FormGroup;
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;

  phoneCtrl!: FormControl;

  loginInfoForm!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  showEmailConfirmError$!: Observable<boolean>;
  showPasswordConfirmError$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private complexFormService: ComplexFormService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservable();
  }

  initMainForm(): void {
    this.mainForm = this.fb.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm,
    });
  }

  initFormControls(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.emailCtrl = this.fb.control('');

    this.confirmEmailCtrl = this.fb.control('');

    this.emailForm = this.fb.group(
      {
        email: this.emailCtrl,
        confirmEmail: this.confirmEmailCtrl,
      },
      {
        validators: [confirmEqualValidator('email', 'confirmEmail')],
        updateOn: 'blur',
      }
    );

    this.contactPreferenceCtrl = this.fb.control('email');

    this.phoneCtrl = this.fb.control('');

    this.usernameCtrl = this.fb.control('', Validators.required);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);

    this.loginInfoForm = this.fb.group(
      {
        username: this.usernameCtrl,
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl,
      },
      {
        validators: [confirmEqualValidator('password', 'confirmPassword')],
        updateOn: 'blur',
      }
    );
  }

  initFormObservable() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'email'),
      tap((showEmailCtrl) => this.setEmailValidators(showEmailCtrl))
    );

    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map((preference) => preference === 'phone'),
      tap((showPhoneCtrl) => this.setPhoneValidators(showPhoneCtrl))
    );

    this.showEmailConfirmError$ = this.emailForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.emailCtrl.value &&
          this.confirmEmailCtrl.value &&
          this.emailForm.hasError('confirmEqual')
      )
    );

    this.showPasswordConfirmError$ = this.loginInfoForm.statusChanges.pipe(
      map(
        (status) =>
          status === 'INVALID' &&
          this.passwordCtrl.value &&
          this.confirmPasswordCtrl.value &&
          this.loginInfoForm.hasError('confirmEqual')
      )
    );
  }

  private setEmailValidators(showEmailCtrl: boolean) {
    if (showEmailCtrl) {
      // Ajout des validators
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([
        Validators.required,
        Validators.email,
      ]);
    } else {
      // Retirer les valdateurs
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  }

  private setPhoneValidators(showPhoneCtrl: boolean) {
    if (showPhoneCtrl) {
      // Ajout des validators
      this.phoneCtrl.addValidators([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]);
    } else {
      // Retirer les valdateurs
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis';
    } else if (ctrl.hasError('email')) {
      return "Merci d'entrer une adresse mail valide";
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else if (ctrl.hasError('validValidator')) {
      return 'Ce champ doit containir le mot VALID';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

  onSubmitForm() {
    console.log(this.mainForm.value);

    const user: ComplexFormValue = {
      ...this.mainForm.value,
    };

    this.loading = true;

    this.complexFormService
      .addUserInfo(user)
      .pipe(
        tap((saved) => {
          this.loading = false;
          if (saved) {
            this.resetForm();
          } else {
            console.error("Erreur d'enregistrement");
          }
        })
      )
      .subscribe();
  }

  private resetForm() {
    this.mainForm.reset();
    this.contactPreferenceCtrl.patchValue('email');
  }
}
