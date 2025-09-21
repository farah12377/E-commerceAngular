import { CartResponse } from './../../core/models/api.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  private cartservice= inject(CartService);
  cartdata: CartResponse | null=null;
  toaster=inject(ToastrService);

  updateloading=false;
  currentindex=0;
  Addressform=false;
  router=inject(Router);

  addressform=new FormGroup({
    details:new FormControl('', [Validators.required,Validators.minLength(10),Validators.maxLength(100),]),
    city:new FormControl('', [Validators.required,Validators.minLength(2),Validators.pattern(/^[a-zA-Z\s]+$/)]),
    phone:new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  get phoneController(){
   return this.addressform.get('phone');
  }

  get detailsController(){
   return this.addressform.get('details');
  }

  get cityController(){
   return this.addressform.get('city');
  }

  ngOnInit(): void {
   
      this.cartservice.getusercart().subscribe({
        next:(res)=>{
          this.cartdata= res;
          
          console.log(this.cartdata);
        },


      })
  }
  updatecount(id:string, count:number, index:number){
     this.updateloading=true;
    this.cartservice.updatecartproductquantity(id,count).subscribe({
      next:(res)=>{
        this.cartdata=res;
        this.updateloading=false;
        this.currentindex=index;
      },
      error:(err)=>{
        this.updateloading=false;
      }

    })
  }

  deleteitem(id:string){
    this.cartservice.deleteproduct(id).subscribe({
       next:(res)=>{
        this.cartdata=res;
      },

    })
  }
  clearcart(){
    this.cartservice.deletecart().subscribe({
       next:(res)=>{
        this.cartdata=null;
      },


    })
  }

  checkout(){
    if(!this.cartdata?.cartId){return;}
    if(this.addressform.invalid){
      this.addressform.markAllAsTouched();
      return;
    }
    this.cartservice.checkoutsession(this.cartdata!.cartId, {details:this.addressform.value.details!, phone:this.addressform.value.phone!, city:this.addressform.value.city!}).subscribe({
      next:(res)=>{
        window.location.href=res.session.url
        console.log(res.session.url)

      },

    })

  }

  checkoutcash(){
    if(!this.cartdata?.cartId){return;}
    if(this.addressform.invalid){
      this.addressform.markAllAsTouched();
      return;
    }
    this.cartservice.checkoutcash(this.cartdata!.cartId,{details:this.addressform.value.details!, phone:this.addressform.value.phone!, city:this.addressform.value.city!}).subscribe({
      next:(res)=>{
        this.toaster.success("order is placed successfully");
        this.router.navigate(['/allorders']);
        console.log(res,"cash");
      },

      

    })

  }

}
