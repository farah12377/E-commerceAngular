import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/models/api.interface';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WhishlistService } from '../../core/services/whishlist.service';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },

    },
    nav: true
  }


  product:Product|null=null;
  isclicked: boolean=false;



  constructor(private productservice:ProductService, private route:ActivatedRoute, private cartservice:CartService, private toaster:ToastrService, private wishlistservice:WhishlistService){}
  ngOnInit(){
    this.route.paramMap.subscribe(params=>{
      const id=params.get('id');
      this.getproductdetails(id!);
    })
    
  }
  getproductdetails(id:string){
    this.productservice.getproductdet(id).subscribe({
        next:(Response)=>{
          if(Response){
            this.product= Response.data;
            

          }
        
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

  addtowhishlist(id:string){
    this.wishlistservice.addtowhishlist(id).subscribe({
      next:(res)=>{
        this.toaster.success("Product added successfully to your wishlist");
        this.isclicked=true;
      
        

      },
    })
  }
}
