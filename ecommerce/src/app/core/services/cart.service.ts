import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartResponse, orders } from '../models/api.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient, private authservice: AuthService){}
  addproducttocart(productId:string):Observable<any>{
    return this.http.post(`${environment.baseurl}/cart`,{productId},{

    })

  }

  updatecartproductquantity(productId:string,count:number):Observable<CartResponse>{
    return this.http.put<CartResponse>(`${environment.baseurl}/cart/${productId}`,{count},{

    })

  }

  deleteproduct(productId:string):Observable<any>{
    return this.http.delete(`${environment.baseurl}/cart/${productId}`,{

    })

  }

  deletecart():Observable<any>{
    return this.http.delete(`${environment.baseurl}/cart`,{

    })

  }

  getusercart():Observable<CartResponse>{
    return this.http.get<CartResponse>(`${environment.baseurl}/cart`,{

    })

  }

  checkoutsession(cartid:string, shippingAddress:{details: string,phone:string,city: string}):Observable<{session:{url:string}}>{
    return this.http.post<{session:{url:string}}>(`${environment.baseurl}/orders/checkout-session/${cartid}?url=${environment.frontend_url}`,
      { shippingAddress },
      {

    })
  }

  getuserorder():Observable<orders>{
    return this.http.get<orders>(`${environment.baseurl}/orders/user/${this.authservice.userData.value.id}`)

  }
  checkoutcash(cartid:string, shippingAddress:{details: string,phone:string,city: string}){
    return this.http.post(`${environment.baseurl}/orders/${cartid}`,
      { shippingAddress},
      {

    })

  }



}



