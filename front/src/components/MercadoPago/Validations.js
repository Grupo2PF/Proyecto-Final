import swal from "sweetalert";

export const regex = {
    cvc: /^[0-9]{3}$/,
    cardExpirationMonth: /^[0-9]{2}$/,
    cardExpirationYear: /^[0-9]{2}$/,
    cardholderName: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    cardNumber: /^[0-9]{16}$/,
    cardholderEmail: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    identificationNumber: /^[0-9]{7,10}$/,
};

export const cardholderNameValidation = (e, inputError, setInputError) => {
    const { name, value } = e.target;
    if (value.length < 3 || value.length > 40) {
        setInputError({
            ...inputError,
            [name]: [true, "El nombre debe tener entre 3 y 40 caracteres."],
        });
    } else if (!regex.cardholderName.test(value)) {
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

export const cardholderEmailValidation = (e, inputError, setInputError) => {
    const { value } = e.target;
    if (value.includes(" ")) {
        setInputError({
            ...inputError,
            cardholderEmail: [true, "No puede contener espacios en blanco"],
        });
        return;
    }
    if (!regex.cardholderEmail.test(value)) {
        setInputError({
            ...inputError,
            cardholderEmail: [
                true,
                "Debe tener un formato de correo electrónico válido, ejemplo: correo10.sky@dev.com",
            ],
        });
        return;
    }
    setInputError({
        ...inputError,
        cardholderEmail: [false, ""]
    });
};

export const cardNumberValidation = (e, inputError, setInputError) => {
    const { value } = e.target;

    if (value.length !== 16 || !regex.cardNumber.test(value)) {
        setInputError({
            ...inputError,
            cardNumber: [true, "El campo solo acepta un maximo de 16 números."],
        });
        return
    }
    setInputError({
        ...inputError,
        cardNumber: [false, ""],
    });

};

export const cardExpirationMonthValidation = (e, inputError, setInputError) => {
    const { value } = e.target;

    if (value.length > 2 || value.length < 2) {
        setInputError({
            ...inputError,
            cardExpirationMonth: [true, "Debe contener 2 digitos."],
        });

    } else if (value > 12 || value < 1) {
        setInputError({
            ...inputError,
            cardExpirationMonth: [true, "Colocar mes del 01 al 12."],
        });
    } else if (!regex.cardExpirationMonth.test(value)) {
        setInputError({
            ...inputError,
            cardExpirationMonth: [true, "El campo solo acepta números."],
        });
    } else {
        setInputError({
            ...inputError,
            cardExpirationMonth: [false, ""],
        });
    }
};

export const cardExpirationYearValidation = (e, inputError, setInputError) => {
    const { value } = e.target;

    if (value.length !== 2) {
        setInputError({
            ...inputError,
            cardExpirationYear: [true, "Debe contener 2 digitos."],
        });
    } else if (value < 21) {
        setInputError({
            ...inputError,
            cardExpirationYear: [true, "La tarjeta debe estar vigente"],
        });

    } else if (!regex.cardExpirationYear.test(value)) {
        setInputError({
            ...inputError,
            cardExpirationYear: [true, "El campo solo acepta números."],
        });
    } else {
        setInputError({
            ...inputError,
            cardExpirationYear: [false, ""],
        });
    }
};

export const cvcValidation = (e, inputError, setInputError) => {
    const { value } = e.target;

    if (value.length !== 3) {
        setInputError({
            ...inputError,
            cvc: [true, "El cvc debe tener 3 digitos."],
        });
    } else if (!regex.cvc.test(value)) {
        setInputError({
            ...inputError,
            cvc: [true, "El campo solo acepta números."],
        });
    } else {
        setInputError({
            ...inputError,
            cvc: [false, ""],
        });
    }
};

export const identificationNumberValidation = (e, inputError, setInputError) => {
    const { value } = e.target;

    if (value.length < 7 || value.length > 10) {
        setInputError({
            ...inputError,
            identificationNumber: [true, "El DNI debe tener entre 7 y 10 números."],
        });
    } else if (!regex.identificationNumber.test(value)) {
        setInputError({
            ...inputError,
            identificationNumber: [true, "El campo solo acepta números."],
        });
    } else {
        setInputError({
            ...inputError,
            identificationNumber: [false, ""],
        });
    }


};

export const validateFormPayment = (state, inputError, setInputError) => {
    let isValid = false;

    const {
        cvc,
        cardExpirationMonth,
        cardExpirationYear,
        cardholderName,
        cardNumber,
        cardholderEmail,
        identificationNumber,
    } = state;

    //   Campos vacios
    if (
        cvc === "" ||
        cardExpirationMonth === "" ||
        cardExpirationYear === "" ||
        cardholderName === "" ||
        cardNumber === "" ||
        cardholderEmail === "" ||
        identificationNumber === ""

    ) {
        const cvcError =
            cvc === "" ? [true, "Debe completar este campo"] : [false, ""];
        const cardExpirationMonthError =
            cardExpirationMonth === "" ? [true, "Debe completar este campo"] : [false, ""];
        const cardExpirationYearError =
            cardExpirationYear === "" ? [true, "Debe completar este campo"] : [false, ""];
        const cardholderNameError =
            cardholderName === "" ? [true, "Debe completar este campo"] : [false, ""];
        const cardNumberError =
            cardNumber === "" ? [true, "Debe completar este campo"] : [false, ""];
        const cardholderEmailError =
            cardholderEmail === "" ? [true, "Debe completar este campo"] : [false, ""];
        const identificationNumberError =
            identificationNumber === "" ? [true, "Debe completar este campo"] : [false, ""];

        setInputError({
            ...inputError,
            cvc: cvcError,
            cardExpirationMonth: cardExpirationMonthError,
            cardExpirationYear: cardExpirationYearError,
            cardholderName: cardholderNameError,
            cardNumber: cardNumberError,
            cardholderEmail: cardholderEmailError,
            identificationNumber: identificationNumberError,

        });
        swal("Error", "Debe completar todos los campos", "error");
        return isValid;
    }

  
    if (cardholderName.trim() === "") {
        const cardholderNameError =
            cardholderName === "" ? [true, "Debe completar este campo"] : [false, ""];
        setInputError({
            ...inputError,
            cardholderName: cardholderNameError,
        });
        swal("Error", "Ningún campo puede estar vacío.", "error");
        return isValid;
    }

    //   Espacios en blanco
    if (
        cvc.includes(" ") ||
        cardExpirationMonth.includes(" ") ||
        cardExpirationYear.includes(" ") ||
        cardNumber.includes(" ") ||
        cardholderEmail.includes(" ") ||
        identificationNumber.includes(" ")
    ) {
        const cvcError = cvc.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];
        const cardExpirationMonthError = cardExpirationMonth.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];
        const cardExpirationYearError = cardExpirationYear.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];
        const cardNumberError = cardNumber.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];
        const cardholderEmailError = cardholderEmail.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];
        const identificationNumberError = identificationNumber.includes(" ")
            ? [true, "No puede contener espacios"]
            : [false, ""];


        setInputError({
            ...inputError,
            cvc: cvcError,
            cardExpirationMonth: cardExpirationMonthError,
            cardExpirationYear: cardExpirationYearError,
            cardNumber: cardNumberError,
            cardholderEmail: cardholderEmailError,
            identificationNumber: identificationNumberError,
        });
        swal(
            "Error",
            "Los campos de foto de perfil, telefono, DNI y fecha de nacimiento NO deben contener espacios en blanco",
            "error"
        );
        return isValid;
    }

    // Nombre sin numeros
    if (!regex.cardholderName.test(cardholderName)) {
        setInputError({
            ...inputError,
            cardholderName: [true, "El campo solo acepta letras y espacios."],
        });
        swal(
            "Error",
            "El nombre no puede contener números ni caracteres especiales ",
            "error"
        );
        return isValid;
    }

    //   DNI
    if (!regex.cvc.test(cvc)) {
        setInputError({
            ...inputError,
            cvc: [true, "El campo solo acepta números."],
        });
        swal(
            "Error",
            "El CVC solo debe contener 3 números.",
            "error"
        );
        return isValid;
    }

    if (!regex.cardExpirationMonth.test(cardExpirationMonth)) {
        setInputError({
            ...inputError,
            cardExpirationMonth: [true, "El campo solo acepta números."],
        });
        swal(
            "Error",
            "El mes de expiración debe contener 2 números entre 01 y 12.",
            "error"
        );
        return isValid;
    }
    if (!regex.cardExpirationYear.test(cardExpirationYear)) {
        setInputError({
            ...inputError,
            cardExpirationYear: [true, "El campo solo acepta números."],
        });
        swal(
            "Error",
            "El año de expiración debe contener los ultimos 2 números del año",
            "error"
        );
        return isValid;
    }
    if (!regex.cardNumber.test(cardNumber)) {
        setInputError({
            ...inputError,
            cardNumber: [true, "El campo solo acepta números."],
        });
        swal(
            "Error",
            "El Numero de la tarjeta debe contener 16 digitos.",
            "error"
        );
        return isValid;
    }
    if (!regex.identificationNumber.test(identificationNumber)) {
        setInputError({
            ...inputError,
            identificationNumber: [true, "El campo solo acepta números."],
        });
        swal(
            "Error",
            "El DNI debe contener entre 7 y 10 números.",
            "error"
        );
        return isValid;
    }

    // if (!regex.cardholderEmail.test(cardholderEmail)) {
    //     const cardholderEmailError = !regex.cardholderEmail.test(cardholderEmail)
    //         ? [
    //             true,
    //             "Debe tener un formato de correo válido. Ej; correo10.sky@dev.com",
    //         ]
    //         : [false, ""];
    //     setInputError({
    //         ...inputError,
    //         cardholderEmail: cardholderEmailError,
    //     });
    //     swal(
    //         "Error",
    //         "Debe tener un formato de correo electrónico válido",
    //         "error"
    //     );
    //     return isValid;
    // }


    isValid = true;
    return isValid;
};
