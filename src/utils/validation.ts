export const validateStringAsNumber = (str: string): number => {
  const number = parseInt(str, 10);

  if (Number.isNaN(number)) {
    throw new Error('Invalid number');
  }

  return number;
};
