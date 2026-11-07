// Describe la forma de cada alojamiento tal como lo devuelve la API.
// Una interface no crea objetos: solo le avisa al editor qué campos hay.
export interface Alojamiento {
  id: number;
  titulo: string;
  descripcion: string | null;
  ubicacion: string;
  categoria: string | null;     // Montaña, Ciudad, Playa o Bosque
  precio_noche: string;         // MySQL lo devuelve como texto ("85000.00")
  capacidad: number;
  imagen: string | null;        // solo el nombre del archivo (puede ser null)
  fecha_publicacion: string;
  usuario_id: number;
}

// Un favorito es un alojamiento + el id del registro en la tabla favoritos
export interface AlojamientoFavorito extends Alojamiento {
  favorito_id: number;
}