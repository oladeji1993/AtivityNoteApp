import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/notification/alert.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signinForm!: FormGroup;
  public submitted = false; 

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private alert: AlertService,
    private cookieService: CookieService
  ) { }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }) 
  }

  get formControl() {
    return this.signinForm.controls;
  }

  loginUser(){
    this.submitted = true;
    if(this.signinForm.invalid){
      return;
    }else{
      this.spinner.show()
      this.auth.loginUser(this.signinForm.value).subscribe((data:any)=>{
        this.cookieService.set('authorized', data[0].data.email)
        if(data[0].status == 'success'){
          this.spinner.hide()
          this.router.navigate(['dashboard'])
          this.alert.showSuccess(data[0].message, 'Success');
        }else{
          this.spinner.hide()
          this.alert.showError(data[0].message, 'Error');
        }
      }, err =>{
        this.spinner.hide()
        this.alert.showError(err.error.message, 'Error');
      })
    }
  }

  register(){
    this.router.navigate(['auth/register']);
  }


}
