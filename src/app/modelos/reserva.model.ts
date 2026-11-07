// Formas de los datos del carrito, las compras y los tickets (lo que devuelve la API)

// Una reserva pendiente (un elemento del carrito)
export interface ItemCarrito {
  id: number;                 // id de la reserva
  alojamiento_id: number;
  titulo: string;
  ubicacion: string;
  imagen: string | null;
  precio_noche: string;
  fecha_entrada: string;      // AAAA-MM-DD
  fecha_salida: string;
  cantidad_personas: number;
  total: string;
}

export interface RespuestaCarrito {
  items: ItemCarrito[];
  total: number;
}

// Lo que devuelve "finalizar compra": una por cada reserva confirmada
export interface CompraFinalizada {
  id_compra: number;
  numero_ticket: string;
}

// Una compra del historial
export interface CompraHistorial {
  id_compra: number;
  titulo: string;
  ubicacion: string;
  imagen: string | null;
  fecha_entrada: string;
  fecha_salida: string;
  cantidad_personas: number;
  total: string;
  numero_ticket: string | null;
  pdf_path: string | null;
}

export interface Ticket {
  id: number;
  reserva_id: number;
  codigo: string;
  fecha_emision: string;
  monto: string;
  pdf_path: string | null;    // null hasta que se genera el PDF
  usuario_id: number;
  fecha_entrada: string;
  fecha_salida: string;
  cantidad_personas: number;
  titulo: string;
  ubicacion: string;
  nombre: string;
  apellido: string;
}

// Una reserva confirmada en un alojamiento del anfitrión (para su panel)
export interface ReservaRecibida {
  id_compra: number;
  nombre: string;
  apellido: string;
  correo: string;
  alojamiento_id: number;
  titulo: string;
  ubicacion: string;
  fecha_entrada: string;
  fecha_salida: string;
  cantidad_personas: number;
  total: string;
  numero_ticket: string | null;
  fecha_emision: string | null;
}