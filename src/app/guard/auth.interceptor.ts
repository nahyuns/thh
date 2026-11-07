import { HttpInterceptorFn } from '@angular/common/http';

// Un interceptor "mira" cada pedido a la API antes de que salga.
// Si hay un token guardado, le agrega el header Authorization,
// así no hay que repetirlo en cada servicio.
export const authInterceptor: HttpInterceptorFn = (peticion, siguiente) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Los pedidos no se pueden modificar: se clona el original con el header agregado
    peticion = peticion.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return siguiente(peticion); // sigue su camino hacia la API
};