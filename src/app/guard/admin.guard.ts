import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../app/components/services/auth.service';

// Un guard se ejecuta ANTES de entrar a una ruta.
// Si devuelve true deja pasar; si devuelve false, bloquea la navegación.
export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Pasa si hay sesión y el usuario es anfitrión o admin
  if (auth.estaLogueado() && auth.puedeAdministrar()) {
    return true;
  }

  // Si no inició sesión, lo mandamos a iniciar sesión; si es un huésped, al inicio
  router.navigate([auth.estaLogueado() ? '/inicio' : '/inicio-sesion']);
  return false;
};