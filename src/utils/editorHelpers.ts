export const addNewLetterFnc = (
  array: Array<Array<string>>,
  codeActiveLine: number,
  word: number,
  position: number,
  letter: string
) => {
  if (!letter.match(/\w|[А-я|$|_]/gm) || letter === 'Tab') {
    return addNewLetterIntoWord(array, codeActiveLine, word, position, letter);
  } else {
    return addNewWord(array, codeActiveLine, word, position, letter);
  }
};

export const addNewLetterIntoWord = (
  array: Array<Array<string>>,
  codeActiveLine: number,
  word: number,
  position: number,
  letter: string
) => {
  return array.map((item, index) => {
    if (index === codeActiveLine) {
      const rightSide = item[word - 1].slice(position);
      let itemArray;
      const newLetter = letter === '{' ? ['{', '}'] : letter === 'Tab' ? [' ', ' '] : [letter];
      if (item.slice(word).length) {
        if (rightSide) {
          itemArray = [
            ...item.slice(0, word - 1),
            item[word - 1].slice(0, position),
            ...newLetter,
            item[word - 1].slice(position),
            ...item.slice(word),
          ];
        } else {
          itemArray = [
            ...item.slice(0, word - 1),
            item[word - 1].slice(0, position),
            ...newLetter,
            ...item.slice(word),
          ];
        }
      } else {
        itemArray = [
          ...item.slice(0, word - 1),
          item[word - 1].slice(0, position),
          ...newLetter,
          item[word - 1].slice(position),
          ...item.slice(word),
        ];
      }
      const filterArray = itemArray.filter((str) => str !== '');
      return filterArray.length ? filterArray : [''];
    }
    return item.filter((str) => str !== '');
  });
};

export const addNewWord = (
  array: Array<Array<string>>,
  codeActiveLine: number,
  word: number,
  position: number,
  letter: string
) => {
  return array.map((item, index) => {
    if (index === codeActiveLine) {
      let addToCount = 0;
      if (!item[word - 1].match(/\w|[А-я|$|_]/gm)) {
        item = [...item.slice(0, word), '', ...item.slice(word)];
        addToCount += 1;
      }
      const newLineArray = item[word + addToCount - 1].split('');
      newLineArray.splice(position, 0, letter);
      const newLine = newLineArray.join('');
      return [...item.slice(0, word - 1 + addToCount), newLine, ...item.slice(word + addToCount)];
    }
    if (item.length === 1 && item[0] === '') {
      return item;
    } else {
      return item.filter((str) => str !== '');
    }
  });
};

export const backspaceSymbolInMiddle = (
  array: Array<Array<string>>,
  activeLine: number,
  word: number,
  position: number,
  activeLineSymbol: number,
  getActiveLineLength: () => number
) => {
  return array.map((item, index) => {
    if (index === activeLine) {
      const newString = [
        ...item[word - 1].slice(0, position - 1),
        ...item[word - 1].slice(position),
      ].join('');
      let newLine;
      if (newString) {
        newLine = [...item.slice(0, word - 1), newString, ...item.slice(word)];
      } else if (activeLine === 0 && activeLineSymbol === 1 && getActiveLineLength() === 1) {
        newLine = [''];
      } else {
        newLine = [...item.slice(0, word - 1), ...item.slice(word)];
      }
      if (newLine.length === 0) {
        newLine = [''];
      }
      return newLine;
    }
    return item;
  });
};

export const backspaceLineWithContent = (array: Array<Array<string>>, activeLine: number) => {
  const lineToDelete = array[activeLine];
  let newLine;
  const wordOnEndOfPrevLine = array[activeLine - 1].at(-1);
  if (wordOnEndOfPrevLine && wordOnEndOfPrevLine === ' ') {
    newLine = [...array[activeLine - 1], ...lineToDelete];
  } else {
    newLine = [
      ...array[activeLine - 1].slice(0, -1),
      array[activeLine - 1][array[activeLine - 1].length - 1] + lineToDelete[0],
      ...lineToDelete.slice(1),
    ];
  }
  return [...array.slice(0, activeLine - 1), newLine, ...array.slice(activeLine + 1)];
};

export const addNewLineFnc = (
  array: Array<Array<string>>,
  activeLineSymbol: number,
  lineLength: number,
  codeActiveLine: number,
  word: number,
  position: number
) => {
  let newArray;
  if (activeLineSymbol === lineLength) {
    newArray = [...array.slice(0, codeActiveLine + 1), [''], ...array.slice(codeActiveLine + 1)];
  } else {
    let restLine = [''];
    newArray = array.map((item, index) => {
      if (index === codeActiveLine) {
        const newLine = [
          ...item.slice(0, word - 1),
          item[word - 1].split('').slice(0, position).join(''),
        ];
        const firstWord = item[word - 1].split('').slice(position).join('');
        if (firstWord) {
          restLine = [item[word - 1].split('').slice(position).join(''), ...item.slice(word)];
        } else {
          restLine = [...item.slice(word)];
        }
        return newLine;
      }
      return item;
    });
    if (!restLine.length) {
      restLine = [''];
    }
    newArray.splice(codeActiveLine + 1, 0, restLine);
  }
  return newArray;
};

export const deleteSymbolFnc = (
  array: Array<Array<string>>,
  activeLineSymbol: number,
  lineLength: number,
  activeLine: number,
  word: number,
  position: number
) => {
  if (activeLineSymbol == lineLength) {
    const newString = [...array[activeLine], ...array[activeLine + 1]];
    return [...array.slice(0, activeLine), newString, ...array.slice(activeLine + 2)];
  } else {
    const line = array[activeLine];
    const editWord = [line[word - 1].slice(0, position), line[word - 1].slice(position + 1)].join(
      ''
    );
    let newLine;
    if (editWord == line[word - 1]) {
      const newString = line[word].split('').slice(1).join('');
      if (newString === ' ') {
        newLine = [...line.slice(0, word), ...line.slice(word + 1)];
      }
      newLine = [...line.slice(0, word), newString, ...line.slice(word + 1)];
    } else {
      newLine = [...line.slice(0, word - 1), editWord, ...line.slice(word)];
    }
    newLine = newLine.filter((str) => str !== '');
    if (!newLine.length) {
      newLine = [''];
    }
    return [...array.slice(0, activeLine), newLine, ...array.slice(activeLine + 1)];
  }
};

export const getWords = (text: string) => {
  const strings = text.split(/\r?\n/);
  const words = strings.map((st) => st.replace(/ /g, '  ').split(/\s/));
  words.forEach(
    (word, index, arr) =>
      (arr[index] = word.map((elem) => (elem.length == 0 ? elem.replace('', ' ') : elem)))
  );
  return words;
};
