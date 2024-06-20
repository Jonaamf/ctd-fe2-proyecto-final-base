import { FC } from "react";
import { CloseButton as Close } from "../../assets";
import { INoticiasNormalizadas } from "../news/fakeRest";
import {
  ContenedorModal,
  TarjetaModal,
  CloseButton,
  ImagenModal,
  CotenedorTexto,
  TituloModal,
  DescripcionModal,
} from "./styled";

/**
 * Componente para mostrar un modal de noticia.
 * @component
 * @param {Props} props - Las propiedades del componente.
 * @param {INoticiasNormalizadas} props.noticia - La noticia a mostrar en el modal.
 * @param {() => void} props.onClose - Función a ejecutar cuando se cierra el modal.
 * @returns {JSX.Element} El componente de modal de noticia.
 */

interface Props {
  noticia: INoticiasNormalizadas;
  onClose: () => void;
}

const ModalNoticia: FC<Props> = ({ noticia, onClose }) => (
  <ContenedorModal>
    <TarjetaModal>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="close-button" />
      </CloseButton>
      <ImagenModal src={noticia.imagen} alt="news-image" />
      <CotenedorTexto>
        <TituloModal>{noticia.titulo}</TituloModal>
        <DescripcionModal>{noticia.descripcion}</DescripcionModal>
      </CotenedorTexto>
    </TarjetaModal>
  </ContenedorModal>
);

export default ModalNoticia;
