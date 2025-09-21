import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { wishlist } from '../models/api.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  constructor(private http:HttpClient ){}
  isWishList :BehaviorSubject<string[]>= new BehaviorSubject<string[]>([]);

  addtowhishlist(id:string){
    return this.http.post(`${environment.baseurl}/wishlist`, {productId: id}, {});
  }

  getuserwhishlist():Observable<wishlist>{
    return this.http.get<wishlist>(`${environment.baseurl}/wishlist`, {});
  }

  removeproductfromwhishlist(id:string):Observable<wishlist>{
    return this.http.delete<wishlist>(`${environment.baseurl}/wishlist/${id}`, {});
  }

  
}
