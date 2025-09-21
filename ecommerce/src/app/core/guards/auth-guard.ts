import { UserData } from './../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice= inject(AuthService);
  const router= inject(Router);
  const UserData=authservice.userData.getValue();
  if(UserData==null){
    return router.navigate(['/login']);
  }
  else{
    return true;

  }
  
};
