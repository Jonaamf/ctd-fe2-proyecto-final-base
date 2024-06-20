import { FC } from "react";
import { INoticiasNormalizadas } from "../news/fakeRest";
import {
  TarjetaNoticia as Tarjeta,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  BotonLectura,
} from "./styled";


/**
 * Componente para mostrar una tarjeta de noticia individual.
 * @component
 * @param {Props} props - Las propiedades del componente.
 * @param {INoticiasNormalizadas} props.noticia - La noticia a mostrar.
 * @param {() => void} props.onClick - Función a ejecutar cuando se hace clic en el botón de lectura.
 * @returns {JSX.Element} El componente de tarjeta de noticia.
 */

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
