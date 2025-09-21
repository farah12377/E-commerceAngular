import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inject, PLATFORM_ID } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
export interface UserData{
  name:string,
  email:string,
  password:string,
  rePassword:string,
  phone:string
}

export interface UserDataLogin{
  email:string,
  password:string,

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData :BehaviorSubject<any>= new BehaviorSubject(null);
  constructor(private http:HttpClient, @Inject(PLATFORM_ID) private platformId: any, private router:Router){
    if (isPlatformBrowser(this.platformId)) {
      const token=localStorage.getItem('token');
      if(token){
        this.decodedToken(token);
      }

    }
  }
  decodedToken(token:string){
    const decoded= jwtDecode(token);
    this.userData.next(decoded);
    return decoded;
  }
  logout(){
    if (isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token');
      this.userData.next(null);
      this.router.navigate(['/login']);
    }

  }

    register(data: UserData):Observable<any>{
      return this.http.post(`${environment.baseurl}/auth/signup`, data);
    }
  
    login(data: UserDataLogin):Observable<any>{
      return this.http.post(`${environment.baseurl}/auth/signin`, data);
    }

    forgetpassword(data: {email:string}):Observable<any>{
      return this.http.post(`${environment.baseurl}/auth/forgotPasswords`, data);
    }

    verifycode(data: {resetCode:string}):Observable<any>{
      return this.http.post(`${environment.baseurl}/auth/verifyResetCode`, data);
    }

    resetpassword(data: {email:string, newPassword:string}):Observable<any>{
      return this.http.put(`${environment.baseurl}/auth/resetPassword1`, data);
    }

    
}
