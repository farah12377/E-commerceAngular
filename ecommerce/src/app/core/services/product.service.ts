import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Response } from '../models/api.interface';
import { environment } from '../../../environments/environment.development';

  interface paginationparams{
    limit ?:number;
    page  ?:number;
  }

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient){}
     getproduct({limit=40 , page=1}:paginationparams):Observable<Response<Product>>{
      return this.http.get<Response<Product>>(`${environment.baseurl}/products?limit=${limit}&page=${page}`);
    }
    getproductdet(id:string):Observable<{data:Product}>{
       return this.http.get<{data:Product}>(`${environment.baseurl}/products/${id}`);

    }
  
}
