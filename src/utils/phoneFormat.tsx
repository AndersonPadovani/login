const PhoneNumberFormat = (input: string): string => {
  // Remove tudo que não for dígito
  const digits = input.replace(/\D/g, "");

  // Formata o número
  const ddd = digits.slice(0, 2); // primeiros 2 dígitos
  const init = digits.slice(2, 3); // primeiros 2 dígitos
  const firstPart = digits.slice(3, 7); // próximo 4 dígitos
  const secondPart = digits.slice(7); // últimos 4 dígitos

  return `(${ddd}) ${init} ${firstPart}-${secondPart}`;
};

export default PhoneNumberFormat;
