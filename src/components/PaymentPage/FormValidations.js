const validations = {
  number: {
    custom: {
      isValid: (value) => value.length > 10,
      message: "Digite o número do cartão",
    },
  },
  name: {
    custom: {
      isValid: (value) => value.length > 3,
      message: "Digite o nome que aparece no cartão",
    },
  },

  expiry: {
    custom: {
      isValid: (value) => parseInt(value.replace("/", "").length, 10) === 4,
      message: "Digite a validade do cartão",
    },
  },

  cvc: {
    custom: {
      isValid: (value) => parseInt(value?.length, 10) >= 3,
      message: "Código de segurança inválido",
    },
  },
};

export default validations;
