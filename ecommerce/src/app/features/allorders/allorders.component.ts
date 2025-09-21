import { orders } from './../../core/models/api.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit{
  private cartservice= inject(CartService);
  toaster =inject(ToastrService);
  orders: orders |null= null;



  ngOnInit(): void {

    this.cartservice.getuserorder().subscribe({
      next:(res)=>{
        this.orders=res;
        console.log(res);
      },

    })
     
  }



}
