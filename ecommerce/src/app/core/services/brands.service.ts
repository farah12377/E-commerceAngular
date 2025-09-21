import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Response, Brand } from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private http= inject(HttpClient);

  getbrands():Observable<Response<Brand>>{
    return this.http.get<Response<Brand>>(`${environment.baseurl}/brands`)
  }
  
}
