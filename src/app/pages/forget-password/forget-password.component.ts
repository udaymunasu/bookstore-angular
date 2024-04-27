import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    // private toast: NgToastService,
    private auth: AuthService,
    private router: Router
  ) { }
  forgetForm

  ngOnInit(): void {
    this.forgetForm = this.fb.group(
      {
        email: ['', Validators.required],
      }
    );
  }

  submit(){
    console.log("form value", this.forgetForm.value)
  }

}
