export const formatCep = (value: string): string => {
  value = value.replace(/\D/g, "");
  if (value.length > 8) {
    value = value.slice(0, 8);
  }
  if (value.length > 5) {
    value = `${value.slice(0, 5)}-${value.slice(5)}`;
  }
  return value;
};
