const validations = {
  name: {
    custom: {
      isValid: (value) => isValidString(value),
      message: "Digite o nome que aparece no cartão",
    },
  },

  expiry: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) === 4,
      message: "Digite a validade do cartão",
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) >= 3,
      message: "Código de segurança inválido",
    },
  },

  number: {
    custom: {
      isValid: (value) => Number(value),
      message: "Digite o número do cartão",
    },
  },
};

export { validations };

function isValidString(value) {
  return value || value?.trim();
}
