import { compareTwoStrings } from 'string-similarity';

export const areStringsCloseToEachOther = (inputString: string, comparedTo: string) => {
  // Check naively
  const lowerCasedComparedTo = comparedTo.toLowerCase();
  const lowerCasedInputString = inputString.toLowerCase();
  if (lowerCasedComparedTo.startsWith(lowerCasedInputString)) {
    return true;
  }

  // Chek string similarity
  const similarityRate = compareTwoStrings(inputString, comparedTo);

  if (inputString.length === 2) {
    return similarityRate > 0;
  }

  if (inputString.length < 5) {
    return similarityRate > 0.3;
  }

  return similarityRate > 0.5;
};
