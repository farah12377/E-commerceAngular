import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response,Category } from '../models/api.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient){}
      getCategories():Observable<Response<Category>>{
         return this.http.get<Response<Category>>(`${environment.baseurl}/categories`)
      
    }
     getcategorydet(id:string):Observable<{data:Category}>{
           return this.http.get<{data:Category}>(`${environment.baseurl}/categories/${id}`);
    
        }
  
}
