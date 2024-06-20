import { INoticias, INoticiasNormalizadas } from "../news/fakeRest";

/**
 * Transforma los datos de noticias obtenidos en un formato normalizado.
 * @param {INoticias[]} noticias - Las noticias a transformar.
 * @returns {INoticiasNormalizadas[]} Las noticias normalizadas.
 */

export const transformarDatos = (noticias: INoticias[]): INoticiasNormalizadas[] => {
  return noticias.map((n) => {
    const titulo = n.titulo
      .split(" ")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");

    const ahora = new Date();
    const minutosTranscurridos = Math.floor(
      (ahora.getTime() - n.fecha.getTime()) / 60000
    );

    return {
      id: n.id,
      titulo,
      descripcion: n.descripcion,
      fecha: `Hace ${minutosTranscurridos} minutos`,
      esPremium: n.esPremium,
      imagen: n.imagen,
      descripcionCorta: n.descripcion.substring(0, 100),
    };
  });
};
