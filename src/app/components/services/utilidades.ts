// Cantidad de noches entre dos fechas AAAA-MM-DD
export function calcularNoches(entrada: string, salida: string): number {
  if (!entrada || !salida) return 0;

  const inicio = new Date(entrada + 'T00:00:00');
  const fin = new Date(salida + 'T00:00:00');

  return Math.round((fin.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
}