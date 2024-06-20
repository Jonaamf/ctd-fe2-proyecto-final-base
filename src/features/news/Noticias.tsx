import { useEffect, useState } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import { obtenerNoticias } from "./fakeRest";
import { INoticiasNormalizadas } from "../news/fakeRest";
import { transformarDatos } from "../news/util";
import TarjetaNoticia from "../news/tarjetaNoticia";
import ModalSuscribir from "../news/modalSuscribir";
import ModalNoticia from "../news/modalNoticia";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const data = transformarDatos(respuesta);
      setNoticias(data);
    };
    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia key={n.id} noticia={n} onClick={() => setModal(n)} />
        ))}
        {modal && (
          modal.esPremium ? (
            <ModalSuscribir onClose={() => setModal(null)} />
          ) : (
            <ModalNoticia noticia={modal} onClose={() => setModal(null)} />
          )
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
