import React, { useState } from "react";
import { UseNoticias, INoticiasNormalizadas } from "../news/NoticiasService";
import { SuscribeImage } from "../../assets";
import {
  ContenedorNoticias,
  TituloNoticias,
  ListaNoticias,
  TarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  BotonLectura,
  ContenedorModal,
  TarjetaModal,
  CloseButton,
  ImagenModal,
  CotenedorTexto,
  TituloModal,
  DescripcionModal,
  BotonSuscribir,
} from "./styled";

const Noticias = () => {
  const { noticias } = UseNoticias();
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia key={n.id}>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>{n.descripcionCorta}</DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal && (
          <ContenedorModal>
            <TarjetaModal>
              <CloseButton onClick={() => setModal(null)}>
                <img src={Close} alt="close-button" />
              </CloseButton>
              <ImagenModal src={modal.esPremium ? SuscribeImage : modal.imagen} alt="news-image" />
              <CotenedorTexto>
                <TituloModal>{modal.esPremium ? "Suscríbete a nuestro Newsletter" : modal.titulo}</TituloModal>
                <DescripcionModal>{modal.esPremium ? "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos." : modal.descripcion}</DescripcionModal>
                {!modal.esPremium && (
                  <BotonSuscribir onClick={() => setTimeout(() => { alert("Suscripto!"); setModal(null); }, 1000)}>
                    Suscríbete
                  </BotonSuscribir>
                )}
              </CotenedorTexto>
            </TarjetaModal>
          </ContenedorModal>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
