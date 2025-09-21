import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { group } from 'console';
import { AuthService, UserData } from '../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isLoading= false;

  constructor(private authservice:AuthService, private toaster: ToastrService, private router:Router){}

  registerForm=new FormGroup({
    name: new FormControl('',[Validators.required, Validators.minLength(6)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)]),
    rePassword: new FormControl('',Validators.required),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, { validators: this.PasswordmatchValidation })

  get nameController(){
   return this.registerForm.get('name');
  }
  get emailController(){
   return this.registerForm.get('email');
  }
  get passwordController(){
   return this.registerForm.get('password');
  }
  get repasswordController(){
   return this.registerForm.get('rePassword');
  }
  get phoneController(){
   return this.registerForm.get('phone');
  }

  onsubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
    
    //   const firstInvalidControl: HTMLElement = document.querySelector(
    //   'form .ng-invalid'
    // ) as HTMLElement;

    // if (firstInvalidControl) {
    //   firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //   firstInvalidControl.focus();
    // }
     return;
    }
    const values=this.registerForm.value as UserData;
    this.register(values);
 
  }
  PasswordmatchValidation(group:AbstractControl): null | Record<string, any>{
    const password=group.get('password')?.value;
    const rePassword= group.get('rePassword')?.value;
    return password===rePassword ? null : {noMatch:true};
    
  }

  register(value:UserData){
     this.isLoading=true;
    this.authservice.register(value).subscribe({
      next:(response)=>{
        this.isLoading=false;
        localStorage.setItem('token',response.token);
        this.authservice.decodedToken(response.token);
        this.toaster.success("Registeration Successful","Success");
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.isLoading=false;
      }
    })
  }

}
