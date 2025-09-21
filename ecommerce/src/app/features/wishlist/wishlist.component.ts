import { Component, inject, OnInit } from '@angular/core';
import { WhishlistService } from '../../core/services/whishlist.service';
import { Product } from '../../core/models/api.interface';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';



@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit{
  private whishlistservice=inject(WhishlistService);
  wishList: Product [] | null=null;
  toaster=inject(ToastrService);
  isclicked:boolean=false;
  private cartservice=inject(CartService);
  

  ngOnInit(): void {
      this.whishlistservice.getuserwhishlist().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.wishList=res.data

          const ids = res.data.map(p => p._id); 
          this.whishlistservice.isWishList.next(ids);

          
        }

      })
  }

 
  removeproductfromwhishlist(id:string){
    this.whishlistservice.removeproductfromwhishlist(id).subscribe({
      next:(res)=>{
        this.wishList=res.data;
        const ids = res.data.map(p => p._id); 
         this.whishlistservice.isWishList.next(ids);
        
        
      },

    })
   }

  addProductToCart(pId:string){
    this.cartservice.addproducttocart(pId).subscribe({
      next:(res)=>{
        this.toaster.success(res.message);

      },
    })

  }


}
