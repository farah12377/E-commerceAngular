import { Component } from '@angular/core';
import { Product } from '../../core/models/api.interface';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { FilterlistPipe } from '../../shared/pipes/filterlist-pipe';


@Component({
  selector: 'app-product',
  imports: [ ProductCardComponent,FilterlistPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
    term:string='';
    products!:Product[]
    constructor(private productservice:ProductService){}
      ngOnInit(){
        this.getAllproducts();
      }
    getAllproducts(){
      this.productservice.getproduct({}).subscribe({
        next:(Response)=>{
          this.products=Response.data;
        },
  
  
  
      })
      
    }

}



