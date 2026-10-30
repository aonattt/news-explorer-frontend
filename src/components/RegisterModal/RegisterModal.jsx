import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import FormField from "../ModalWithForm/FormField";
import useFormWithValidation from "../../hooks/useFormWithValidation";

function RegisterModal({
  isOpen,
  onClose,
  onSubmit,
  onSwitch,
  isSubmitting,
  serverError,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation({ email: "", password: "", name: "" });

  useEffect(() => {
    if (isOpen) resetForm();
  }, [isOpen, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values);
  };

  return (
    <ModalWithForm
      name="register"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Sign up"
      isValid={isValid}
      isSubmitting={isSubmitting}
      serverError={serverError}
      footer={
        <>
          or{" "}
          <button type="button" className="modal__link" onClick={onSwitch}>
            Sign in
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
        autoComplete="new-password"
        minLength={8}
        required
      />
      <FormField
        label="Username"
        type="text"
        name="name"
        placeholder="Enter your username"
        value={values.name}
        onChange={handleChange}
        error={errors.name}
        autoComplete="username"
        minLength={2}
        maxLength={30}
        required
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
