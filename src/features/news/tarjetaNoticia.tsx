import { FC } from "react";
import {
  TarjetaNoticia as Tarjeta,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  BotonLectura,
} from "./styled";
import { INoticiasNormalizadas } from "../news/fakeRest";

interface Props {
  noticia: INoticiasNormalizadas;
  onClick: () => void;
}

const TarjetaNoticia: FC<Props> = ({ noticia, onClick }) => (
  <Tarjeta>
    <ImagenTarjetaNoticia src={noticia.imagen} />
    <TituloTarjetaNoticia>{noticia.titulo}</TituloTarjetaNoticia>
    <FechaTarjetaNoticia>{noticia.fecha}</FechaTarjetaNoticia>
    <DescripcionTarjetaNoticia>{noticia.descripcionCorta}</DescripcionTarjetaNoticia>
    <BotonLectura onClick={onClick}>Ver más</BotonLectura>
  </Tarjeta>
);

export default TarjetaNoticia;
