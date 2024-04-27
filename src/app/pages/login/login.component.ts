import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmPasswordValidator } from 'src/app/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    // private toast: NgToastService,
    private auth: AuthService,
    private router: Router
  ) { }

  loginForm

  ngOnInit(): void {
    this.loginForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    );
  }

  login() {
    // console.log("login values", this.loginForm.value)
    debugger
    this.auth.loginService(this.loginForm.value).subscribe({
      next: (res) => {
        if (res && res.user_id) {
          this.auth.setUserIdInLocalStorage(res.user_id);
        }
        this.router.navigate(['books']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
