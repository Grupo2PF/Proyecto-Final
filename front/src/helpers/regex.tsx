export type Regex = {
  "name": RegExp;
  "lastName": RegExp;
  "email": RegExp;
  "password": RegExp;
  "confirmPassword": RegExp;
};

const regex = (): Regex => {
  return {
    "name": /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
    "lastName": /^[a-zA-ZÀ-ÿ\s]{3,40}$/, // Letras y espacios, pueden llevar acentos, máximo 40 caracteres.
    "email": /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    "password": /^.{4,12}$/, // 4 a 12 digitos.
    "confirmPassword": /^.{4,12}$/, // 4 a 12 digitos.
  };
};

export default regex();
