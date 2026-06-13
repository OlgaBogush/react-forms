export const getPasswordSymbols = (password: string): number => {
  let counter = 0;

  if (/\d/.test(password)) counter++;
  if (/[A-Z]/.test(password)) counter++;
  if (/[a-z]/.test(password)) counter++;
  if (/[@$!%*?&]/.test(password)) counter++;

  return counter;
};
