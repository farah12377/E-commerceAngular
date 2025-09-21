import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
   const loaderservice=inject(LoaderService);
   loaderservice.showloader();
  return next(req).pipe(
    finalize(()=>
    loaderservice.hideloader()
  )
  );
};
