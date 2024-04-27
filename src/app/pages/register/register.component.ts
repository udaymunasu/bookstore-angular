import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  constructor(
    private fb: FormBuilder,
    // private toast: NgToastService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: [''],
      },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  register() {
    console.log('this.registerForm.value', this.registerForm.value);
    this.auth.registerService(this.registerForm.value).subscribe({
      next: (res) => {
        alert('userCreated');
        console.log('Resposer register', res);
        this.router.navigate(['login'])
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     let signUpObj = {
  //       ...this.registerForm.value,
  //       role: '',
  //       token: '',
  //     };
  //   //   this.auth.signUp(signUpObj).subscribe({
  //   //     next: (res) => {
  //   //       console.log(res);
  //   //       this.registerForm.reset();
  //   //       this.router.navigate(['login']);
  //   //       this.toast.success({
  //   //         detail: 'Success',
  //   //         summary: 'Registration Success',
  //   //         duration: 5000,
  //   //       });
  //   //     },
  //   //     error: (err) => {
  //   //       console.log(err);
  //   //       this.toast.error({
  //   //         detail: 'ERROR',
  //   //         summary: err.error.message,
  //   //         duration: 50000000,
  //   //       });
  //   //     },
  //   //   });
  //   // } else {
  //   //   this.toast.error({
  //   //     detail: 'ERROR',
  //   //     summary: 'Please fill all details',
  //   //     duration: 5000,
  //   //   });
  //   //   // ValidateForm.validateAllFormFields(this.registerForm); //{7}

  //   }
  // }
}
