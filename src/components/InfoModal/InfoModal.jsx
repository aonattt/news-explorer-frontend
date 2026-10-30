import ModalWithForm from "../ModalWithForm/ModalWithForm";

function InfoModal({ isOpen, onClose, title, linkText, onLinkClick }) {
  return (
    <ModalWithForm name="info" title={title} isOpen={isOpen} onClose={onClose}>
      <button type="button" className="modal__link modal__link_size_large" onClick={onLinkClick}>
        {linkText}
      </button>
    </ModalWithForm>
  );
}

export default InfoModal;
