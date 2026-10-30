import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  submitText,
  isValid = true,
  isSubmitting,
  serverError,
  footer,
  children,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleEscape = (evt) => {
      if (evt.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) onClose();
  };

  return (
    <div
      className={`modal modal_type_${name}${isOpen ? " modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="modal__container" role="dialog" aria-modal="true">
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        />
        <h2 className="modal__title">{title}</h2>
        {onSubmit ? (
          <form className="modal__form" name={name} onSubmit={onSubmit} noValidate>
            {children}
            {serverError && (
              <span className="modal__server-error">{serverError}</span>
            )}
            <button
              type="submit"
              className="modal__submit"
              disabled={!isValid || isSubmitting}
            >
              {submitText}
            </button>
          </form>
        ) : (
          children
        )}
        {footer && <p className="modal__footer">{footer}</p>}
      </div>
    </div>
  );
}

export default ModalWithForm;
