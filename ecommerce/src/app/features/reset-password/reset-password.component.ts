import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  step=1;
  toaster=inject(ToastrService);
  authservice=inject(AuthService);
  router=inject(Router);

  forgetpasswordgroup= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  verifycodegroup= new FormGroup({
    resetcode: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  resetpasswordgroup= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/)])
  })

  get emailController(){
   return this.forgetpasswordgroup.get('email');
  }
  get codeController(){
   return this.verifycodegroup.get('resetcode');
  }
  get newPasswordController(){
   return this.resetpasswordgroup.get('newPassword');
  }

  handleforgetpasswordform(){
    if(this.forgetpasswordgroup.invalid){
      this.forgetpasswordgroup.markAllAsTouched();
      return
    }
    this.resetpasswordgroup.get('email')?.patchValue(this.forgetpasswordgroup.get('email')?.value || '')
    this.authservice.forgetpassword({email: this.forgetpasswordgroup.value.email!}).subscribe({
      next:(res)=>{
        this.step=2;
      },
      error:(error)=>{
        this.toaster.error(error.message);
      }
    })
    

  }

  handleverifycodeform(){
    if(this.verifycodegroup.invalid){
      this.verifycodegroup.markAllAsTouched();
      return
    }
    this.authservice.verifycode({resetCode: this.verifycodegroup.value.resetcode!}).subscribe({
      next:(res)=>{
        this.step=3;
      },
      error:(error)=>{
        this.toaster.error(error.message);
      }
    })
    
    

  }

  handleresetpasswordform(){
    if(this.resetpasswordgroup.invalid){
      this.resetpasswordgroup.markAllAsTouched();
      return
    }
        this.authservice.resetpassword({email: this.resetpasswordgroup.value.email!, newPassword:this.resetpasswordgroup.value.newPassword!}).subscribe({
      next:(res)=>{
        this.toaster.success("Password is Reset Successfully");
        localStorage.setItem('token',res.token);
        this.authservice.decodedToken(res.token);
        this.router.navigate(['/home']);
      },
      error:(error)=>{
        this.toaster.error(error.message);
      }
    })
    

  }
}
