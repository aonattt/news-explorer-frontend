import { useCallback, useState } from "react";

export default function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const { name, value, validationMessage, validity, form } = evt.target;
    const message = validity.typeMismatch
      ? "Invalid email address"
      : validationMessage;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: message }));
    setIsValid(form.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = initialValues) => {
      setValues(newValues);
      setErrors({});
      setIsValid(false);
    },
    // initialValues is a literal from the caller; reset only on demand
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { values, errors, isValid, handleChange, resetForm };
}
