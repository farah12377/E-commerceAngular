import { Component, OnInit, signal, PLATFORM_ID,  Injectable, Inject, } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent, GlobalLoaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  constructor(private authservice: AuthService, @Inject(PLATFORM_ID) private platformId: any){}
  protected readonly title = signal('ecommerce');
  ngOnInit(): void {
    
      if (isPlatformBrowser(this.platformId)) {
        const token=localStorage.getItem('token');
        if(token){
          this.authservice.decodedToken(token);
        }

      }
  }
}
