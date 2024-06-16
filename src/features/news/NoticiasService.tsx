import { useEffect, useState } from "react";
import { obtenerNoticias, INoticias } from "./fakeRest";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

export const UseNoticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => ({
        id: n.id,
        titulo: n.titulo.split(" ").map((str) => str.charAt(0).toUpperCase() + str.slice(1)).join(" "),
        descripcion: n.descripcion,
        fecha: `Hace ${Math.floor((new Date().getTime() - n.fecha.getTime()) / 60000)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      }));

      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return { noticias };
};
