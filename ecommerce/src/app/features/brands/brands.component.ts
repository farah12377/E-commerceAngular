import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../core/models/api.interface';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private brandsservice=inject(BrandsService);
  toaster=inject(ToastrService);
  brands:Brand[]| null=[];
  index:number | null=null;
  isclicked:boolean=false;

  ngOnInit(): void {
      this.brandsservice.getbrands().subscribe({
        next:(res)=>{
          console.log(res);
          this.brands=res.data;
        },

      })
  }
getid(index:number){
 this.index=index;
 console.log("hello")
 this.isclicked=true;
}
  clicked(){
    this.isclicked=false;
    console.log("hi")
  }

}
