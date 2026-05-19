import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const userRole = localStorage.getItem('role');

  if (userRole === 'ADMIN') {
    return true;
  } else {
    router.navigate(['/beneficiary']);
    return false;
  }
};
