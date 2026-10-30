function FormField({ label, error, ...inputProps }) {
  return (
    <label className="modal__field">
      <span className="modal__label">{label}</span>
      <input className="modal__input" {...inputProps} />
      <span className="modal__error">{error}</span>
    </label>
  );
}

export default FormField;
