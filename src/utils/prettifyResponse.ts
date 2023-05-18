export const prettifyResponse = (data: string) => {
  let startIndex = 0;
  return data
    .split('')
    .reduce((newArray: Array<Array<string>>, item, index, oldArray) => {
      if (item === '\n') {
        newArray.push(oldArray.slice(startIndex, index));
        startIndex = index + 1;
      }
      if (oldArray[index + 1] === undefined) {
        newArray.push(oldArray.slice(startIndex, index + 1));
      }
      return newArray;
    }, [])
    .reduce((newArray: Array<Array<string | null>>, string) => {
      const newString = string.map((item, index, array) => {
        return isLetter(item) ? generateWord(item, index, array) : item;
      });
      newArray.push(newString);
      return newArray;
    }, [])
    .reduce((newArray: Array<Array<string>>, string) => {
      const arrWithoutNull = string.filter((item) => item !== null);
      newArray.push(arrWithoutNull as string[]);
      return newArray;
    }, []);
};

function isLetter(symbol: string) {
  const regexp = /[\p{Alpha}]/gu;
  return symbol.match(regexp);
}

let newWord = '';
function generateWord(symbol: string, index: number, array: string[]) {
  const regexp = /[\p{Alpha}]/gu;
  if (array[index + 1].match(regexp)) {
    newWord += symbol;
    return null;
  } else {
    const respWord = newWord + symbol;
    newWord = '';
    return respWord;
  }
}
