import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RegisterUser } from '../../../models/auth.model'
import { LoginUser } from '../../../models/auth.model'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.serverUrl;


  constructor(
    private http : HttpClient,
  ) { }

  loginUser(loginUser: LoginUser){ 
    return this.http.post(`${this.baseUrl}/user/login`, loginUser);
  };

  registerUser(registerUser: RegisterUser){
    return this.http.post(`${this.baseUrl}/user/`, registerUser);
  };

}
