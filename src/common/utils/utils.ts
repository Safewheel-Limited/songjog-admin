export const lastWhitSpaceTrim = (str: string) => {
  return str.replace(/((\s*\S+)*)\s*/, "$1");
};
