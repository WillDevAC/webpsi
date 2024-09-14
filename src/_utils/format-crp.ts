export const formatCrp = (value: string): string => {
  value = value.replace(/\D/g, "");
  if (value.length > 8) {
    value = value.slice(0, 8);
  }
  if (value.length > 2) {
    value = `${value.slice(0, 2)}/${value.slice(2)}`;
  }
  return value;
};
