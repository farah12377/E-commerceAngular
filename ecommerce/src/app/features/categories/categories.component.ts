import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../core/models/api.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categoryservice= inject(CategoryService);
   toaster=inject(ToastrService);
    categories:Category[]| null=null;

  ngOnInit(): void {
      this.categoryservice.getCategories().subscribe({
        next:(res)=>{
          console.log(res);
          this.categories=res.data;
        },

      })
  }


}
