export const formatCurrency = (value) => {
  return `₦ ${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
};
