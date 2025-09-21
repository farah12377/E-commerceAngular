import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading=signal(false);
  showloader(){
    this.isLoading.set(true);
  }
  hideloader(){
    this.isLoading.set(false);
  }
}
