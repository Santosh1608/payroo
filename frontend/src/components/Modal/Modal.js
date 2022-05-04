import ReactModal from "react-modal";
import styleClasses from "./Modal.module.css";
export const Modal = ({ children, isModalOpen, setModalOpen }) => {
  ReactModal.setAppElement("#root");
  return (
    <ReactModal
      isOpen={isModalOpen}
      onRequestClose={() => setModalOpen(false)}
      className={styleClasses.Modal}
      overlayClassName={styleClasses.Overlay}
    >
      {children}
    </ReactModal>
  );
};
