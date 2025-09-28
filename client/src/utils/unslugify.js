export const unslugify = (str) => {
  if (!str) return "";

  return str
    .replace(/-/g, " ")                     // dashes -> spaces
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize each word
};
