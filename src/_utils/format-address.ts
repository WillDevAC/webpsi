export const validateFields = (
  address: any,
  cep: string,
  serviceType: any
): boolean => {
  const isCepValid = /^[0-9]{5}-[0-9]{3}$/.test(cep);
  const isAddressValid =
    !!address.rua &&
    !!address.numero &&
    !!address.bairro &&
    !!address.cidade &&
    !!address.estado;
  const isServiceTypeSelected = !!serviceType && serviceType !== "";

  return (
    (serviceType === "online" || (isCepValid && isAddressValid)) &&
    isServiceTypeSelected
  );
};
