import { FC } from "react";
import { CloseButton as Close } from "../../assets";
import {
  ContenedorModal,
  TarjetaModal,
  CloseButton,
  ImagenModal,
  CotenedorTexto,
  TituloModal,
  DescripcionModal,
} from "./styled";
import { INoticiasNormalizadas } from "../news/fakeRest";

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
