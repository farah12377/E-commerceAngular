import { Component } from '@angular/core';
import { UserDataLogin } from '../../core/services/auth.service';
import {AbstractControl, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { group } from 'console';
import { AuthService } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
   isLoading= false;

  constructor(private authservice:AuthService, private toaster: ToastrService, private router:Router){}

  loginForm=new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),


  })


  get emailController(){
   return this.loginForm.get('email');
  }
  get passwordController(){
   return this.loginForm.get('password');
  }


  onsubmit(){
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    
    //   const firstInvalidControl: HTMLElement = document.querySelector(
    //   'form .ng-invalid'
    // ) as HTMLElement;

    // if (firstInvalidControl) {
    //   firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   firstInvalidControl.focus();
    // }
     return;
    }
    const values=this.loginForm.value as UserDataLogin;
    this.login(values);
 
  }


  login(value:UserDataLogin){
     this.isLoading=true;
    this.authservice.login(value).subscribe({
      next:(response)=>{
        this.isLoading=false;
        localStorage.setItem('token',response.token);
        this.authservice.decodedToken(response.token);
        this.toaster.success("login Successful","Success");
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.isLoading=false;
      }
    })
  }


}
