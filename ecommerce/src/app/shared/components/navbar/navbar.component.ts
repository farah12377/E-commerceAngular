import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbiteservice';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLogin=false;
  pages:{path:string, title:string}[]=[
    {path:"home",title:"Home"},
    {path:"cart",title:"Cart"},
    {path:"products",title:"Products"},
    {path:"categories",title:"Categories"},
    {path:"brands",title:"Brands"},
    {path:"wishlist",title:"WishList"},
  ]

    authpages:{path:string, title:string}[]=[
    {path:"login",title:"Login"},
    {path:"register",title:"Register"},

  ]
  constructor(private flowbiteService: FlowbiteService, private authservice: AuthService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    this.authservice.userData.subscribe({
      next:(user)=>{
        if(user!=null){
          this.isLogin=true;
        }
        else{
          this.isLogin=false;
        }
      }
    })
  }
  logout(){
    this.authservice.logout();
  }

}
