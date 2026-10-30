import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import FormField from "../ModalWithForm/FormField";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function LoginModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitch,
  isSubmitting,
  serverError,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation({ email: "", password: "" });

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      name="login"
      title="Sign in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign in"
      isValid={isValid}
      isSubmitting={isSubmitting}
      serverError={serverError}
      footer={
        <>
          or{" "}
          <button type="button" className="modal__link" onClick={onSwitch}>
            Sign up
          </button>
        </>
      }
    >
      <FormField
        label="Email"
        type="email"
        name="email"
        placeholder="Enter email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        autoComplete="email"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        autoComplete="current-password"
        minLength={8}
        required
      />
    </ModalWithForm>
  );
}

export default LoginModal;
