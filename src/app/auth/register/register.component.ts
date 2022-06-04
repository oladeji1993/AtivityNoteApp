import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/shared/notification/alert.service';
import { AuthService } from 'src/app/shared/service/auth/auth.service';
import { MustMatch } from 'src/app/shared/service/must-match-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  public submitted = false; 

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    })
  }

  get formControl() {
    return this.registerForm.controls;
  }

  registerUser(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }else{
      this.spinner.show()
      const {first_name, last_name, email, password} = this.registerForm.value
      let data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      }
      this.auth.registerUser(data).subscribe((resp:any) =>{
        if(resp.status === 401){
          this.alert.showError(resp.message, 'Error');
          this.spinner.hide()
          return;
        }
        this.spinner.hide()
        this.router.navigate(['auth'])
        this.alert.showSuccess(resp.message, 'Success');
      }, error => {
        console.log(error);
        this.spinner.hide()
        this.alert.showError(error.error.message, 'Error');
      })
    }
  }

  login(){
    this.router.navigate(['/auth']);
  }


}
