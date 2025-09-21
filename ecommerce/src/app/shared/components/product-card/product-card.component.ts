import { WhishlistService } from './../../../core/services/whishlist.service';
import { Component, inject, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../core/models/api.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!:Product
  private cartservice=inject(CartService);
  toaster=inject(ToastrService);
  whishlistService=inject(WhishlistService);
  isClicked:boolean=false;

  addProductToCart(pId:string){
    this.cartservice.addproducttocart(pId).subscribe({
      next:(res)=>{
        this.toaster.success(res.message);

      },
    })

  }
  ngOnInit(): void {
      this.whishlistService.isWishList.subscribe(ids => {
      this.isClicked = ids.includes(this.product._id);
    });
  }
  


  addtowhishlist(id: string) {
    if (this.isClicked) {
      this.whishlistService.removeproductfromwhishlist(id).subscribe({
        next:(res)=>{
          this.toaster.success("Removed from wishlist");
          const ids = res.data.map((p:any) => p._id);
          this.whishlistService.isWishList.next(ids);
        }
      })
    } else {
      this.whishlistService.addtowhishlist(id).subscribe({
        next:(res)=>{
          this.toaster.success("Product added successfully to your wishlist");
          this.whishlistService.getuserwhishlist().subscribe((res)=>{
            const ids = res.data.map((p:any) => p._id);
            this.whishlistService.isWishList.next(ids);
          });
        }
      })
    }
  }








}
