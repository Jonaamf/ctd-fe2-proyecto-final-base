import { FC } from "react";
import { SuscribeImage, CloseButton as Close } from "../../assets";
import {
  ContenedorModal,
  TarjetaModal,
  CloseButton,
  ImagenModal,
  CotenedorTexto,
  TituloModal,
  DescripcionModal,
  BotonSuscribir,
} from "./styled";

interface Props {
  onClose: () => void;
}

const ModalSuscribir: FC<Props> = ({ onClose }) => (
  <ContenedorModal>
    <TarjetaModal>
      <CloseButton onClick={onClose}>
        <img src={Close} alt="close-button" />
      </CloseButton>
      <ImagenModal src={SuscribeImage} alt="mr-burns-excelent" />
      <CotenedorTexto>
        <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
        <DescripcionModal>
          Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
        </DescripcionModal>
        <BotonSuscribir
          onClick={() => {
            setTimeout(() => {
              alert("Suscripto!");
              onClose();
            }, 1000);
          }}
        >
          Suscríbete
        </BotonSuscribir>
      </CotenedorTexto>
    </TarjetaModal>
  </ContenedorModal>
);

export default ModalSuscribir;
