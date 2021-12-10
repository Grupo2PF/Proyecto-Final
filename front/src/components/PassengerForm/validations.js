import swal from "sweetalert";

export const regex = {
  name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  lastName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
  dni: /^[0-9]{8,10}$/,
};

export const nameValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;
  if (value.length < 3 || value.length > 40) {
    setInputError({
      ...inputError,
      [name]: [true, "El nombre debe tener entre 3 y 40 caracteres."],
    });
  } else if (!regex.name.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta letras y espacios."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const lastNameValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;
  if (value.length < 3 || value.length > 40) {
    setInputError({
      ...inputError,
      [name]: [true, "El apellido debe tener entre 3 y 40 caracteres."],
    });
  } else if (!regex.lastName.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta letras y espacios."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const dniValidation = (e, inputError, setInputError) => {
  const { name, value } = e.target;

  if (value.length < 8 || value.length > 10) {
    setInputError({
      ...inputError,
      [name]: [true, "El DNI debe tener entre 8 y 10 números."],
    });
  } else if (!regex.dni.test(value)) {
    setInputError({
      ...inputError,
      [name]: [true, "El campo solo acepta números."],
    });
  } else {
    setInputError({
      ...inputError,
      [name]: [false, ""],
    });
  }
};

export const validateForm = (input, inputError, setInputError) => {
  let isValid = false;

  const { name, lastName, dni } = input;

  //   Campos vacios
  if (name === "" || lastName === "" || dni === "") {
    const nameError =
      name === "" ? [true, "Debe completar este campo"] : [false, ""];
    const lastNameError =
      lastName === "" ? [true, "Debe completar este campo"] : [false, ""];
    const dniError =
      dni === "" ? [true, "Debe completar este campo"] : [false, ""];

    setInputError({
      ...inputError,
      name: nameError,
      lastName: lastNameError,
      dni: dniError,
    });
    swal("Error", "Debe completar todos los campos", "error");
    return isValid;
  }

  //   Campos de nombre y apellido vacios (trim)
  if (name.trim() === "" || lastName.trim() === "") {
    const nameError =
      name === "" ? [true, "Debe completar este campo"] : [false, ""];
    const lastNameError =
      lastName === "" ? [true, "Debe completar este campo"] : [false, ""];
    setInputError({
      ...inputError,
      name: nameError,
      lastName: lastNameError,
    });
    swal("Error", "Ningún campo puede estar vacío.", "error");
    return isValid;
  }

  // Nombre sin numeros
  if (!regex.name.test(name)) {
    setInputError({
      ...inputError,
      name: [true, "El campo solo acepta letras y espacios."],
    });
    swal(
      "Error",
      "El nombre no puede contener números ni caracteres especiales ",
      "error"
    );
    return isValid;
  }

  // Apellido sin numeros
  if (!regex.lastName.test(lastName)) {
    setInputError({
      ...inputError,
      lastName: [true, "El campo solo acepta letras y espacios."],
    });
    swal(
      "Error",
      "El apellido no puede contener números ni caracteres especiales ",
      "error"
    );
    return isValid;
  }

  //   DNI
  if (!regex.dni.test(dni) || dni.includes(" ")) {
    setInputError({
      ...inputError,
      dni: [true, "El campo no debe contener espacios, números ni simbolos."],
    });
    swal("Error", "El DNI solo puede contener entre 8 y 10 números.", "error");
    return isValid;
  }

  isValid = true;
  return isValid;
};
