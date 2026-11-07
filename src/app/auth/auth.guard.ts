import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../app/components/services/auth.service';

// Deja entrar solo a quien inició sesión; si no, lo manda a iniciar sesión.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.estaLogueado()) {
    return true;
  }

  router.navigate(['/inicio-sesion']);
  return false;
};