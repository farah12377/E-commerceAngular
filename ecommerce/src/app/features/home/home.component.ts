import { Category, Product, Response } from './../../core/models/api.interface';
import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../../core/services/product.service';
import {CarouselModule} from 'ngx-owl-carousel-o'
import { CategoryService } from '../../core/services/category.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { FilterlistPipe } from '../../shared/pipes/filterlist-pipe';


@Component({
  selector: 'app-home',
  imports: [ProductCardComponent,CarouselModule, FormsModule, FilterlistPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  term:string='';
  products!:Product[]
  categories!: Category[]
  constructor(private productservice:ProductService, private categoryservice:CategoryService){}
    ngOnInit(){
      this.getAllproducts();
      this.getcategories();
    }
  getAllproducts(){
    this.productservice.getproduct({}).subscribe({
      next:(Response)=>{
        this.products=Response.data;
        console.log(this.products);
      },



    })
    
  }
  getcategories(){
    this.categoryservice.getCategories().subscribe({
      next:(res)=>{
        this.categories=res.data;
      },

    })
  }


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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }


}
