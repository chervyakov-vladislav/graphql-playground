import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';
import { ConstructionOutlined } from '@mui/icons-material';

export function Editor() {
  const [code, setCode] = useState<Array<Array<string>>>([['']]);
  const [activeLine, setActiveLine] = useState(0);
  const [activeLineSymbol, setActiveLineSymbol] = useState(0);
  const { tabs, activeTabId } = useAppSelector((state) => state.editorTab);
  const [isFocus, setIsFocus] = useState(false);
  const [requestCode, setRequestCode] = useState('');

  let height = activeLine * 20;
  let left = activeLineSymbol * 9.7;
  useEffect(() => {
    height = activeLine * 24;
    const lineLength = getActiveLineLength();
    if (lineLength < activeLineSymbol) {
      setActiveLineSymbol(lineLength);
    }
  }, [activeLine]);
  useEffect(() => {
    left = activeLineSymbol * 9;
  }, [activeLineSymbol]);

  useEffect(() => {
    const item = tabs.find((item) => item.id == activeTabId);
    if (item) {
      setRequestCode(item.requestCode);
    }
  }, [activeTabId]);

  const focusEvent = () => {
    setIsFocus(true);
  };

  const blurEvent = () => {
    setIsFocus(false);
  };

  const clickNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const line = e.currentTarget.getAttribute('data-line');
    // @ts-ignore
    const word = e.target.getAttribute('data-letter');
    console.log(word);
    const position = window.getSelection()?.focusOffset;
    if (line) {
      setActiveLine(Number(line));
    }
    if (word) {
      let lineLength = 0;
      for (let i = 0; i < word; i++) {
        if (Number(line) >= 0) {
          lineLength += code[Number(line)][i].length;
        }
      }
      if (position) {
        if (code[Number(line)][word] === ' ') {
          setActiveLineSymbol(lineLength + 1);
        } else {
          setActiveLineSymbol(lineLength + position);
        }
      }
    } else {
      if (line) {
        setActiveLineSymbol(getActiveLineLength(Number(line)));
      }
    }
    console.log(window.getSelection());
  };

  const editorClickEvent = () => {
    const line = code.length;
    const lastSymbol = getActiveLineLength(line - 1);
    setActiveLine(line - 1);
    setActiveLineSymbol(lastSymbol);
  };

  const updateCode = (newCodeArray: Array<Array<string>>) => {
    setCode(newCodeArray);
  };

  const getActiveLineLength = (line?: number) => {
    const lineToCalc = line ?? activeLine;
    return code[lineToCalc].reduce((acc, item) => acc + item.length, 0);
  };
  const getActiveLineLengthArr = (line: number, array: Array<Array<string>>) => {
    const lineToCalc = line ?? activeLine;
    return array[lineToCalc].reduce((acc, item) => acc + item.length, 0);
  };

  const getCurrentWord = () => {
    const currentLine = code[activeLine];
    let sumLength = 0;
    let word = 0;
    do {
      sumLength += currentLine[word].length;
      word += 1;
    } while (sumLength < activeLineSymbol);
    return {
      word,
      position: currentLine[word - 1].length - (sumLength - activeLineSymbol),
    };
  };

  const addNewLetter = (letter: string) => {
    let newCodeArray;
    const { word, position } = getCurrentWord();
    if (!letter.match(/\w|[А-я]/gm) || letter === 'Tab') {
      newCodeArray = code.map((item, index) => {
        if (index === activeLine) {
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
        return item;
      });
    } else {
      newCodeArray = code.map((item, index) => {
        if (index === activeLine) {
          let addToCount = 0;
          if (!item[word - 1].match(/\w|[А-я]/gm)) {
            item.splice(word, 0, '');
            addToCount += 1;
          }
          const newLineArray = item[word + addToCount - 1].split('');
          newLineArray.splice(position, 0, letter);
          const newLine = newLineArray.join('');
          const newItem = [
            ...item.slice(0, word - 1 + addToCount),
            newLine,
            ...item.slice(word + addToCount),
          ];
          return newItem;
        }
        return item;
      });
    }
    if (letter === 'Tab') {
      setActiveLineSymbol((prevState) => prevState + 2);
    } else {
      setActiveLineSymbol((prevState) => prevState + 1);
    }
    updateCode(newCodeArray);
  };

  const addNewLine = () => {
    let newArray;
    const lineLength = getActiveLineLength();
    if (activeLineSymbol === lineLength) {
      newArray = [...code.slice(0, activeLine + 1), [''], ...code.slice(activeLine + 1)];
    } else {
      const { word, position } = getCurrentWord();
      let restLine = [''];
      newArray = code.map((item, index) => {
        if (index === activeLine) {
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
      newArray.splice(activeLine + 1, 0, restLine);
    }
    setActiveLine((prevState) => prevState + 1);
    setActiveLineSymbol(0);
    updateCode(newArray);
  };

  const arrowNavigation = (key: string) => {
    switch (key) {
      case 'ArrowUp':
        setActiveLine(activeLine - 1 >= 0 ? activeLine - 1 : activeLine);
        break;
      case 'ArrowDown':
        setActiveLine(activeLine + 2 > code.length ? activeLine : activeLine + 1);
        break;
      case 'ArrowLeft':
        setActiveLineSymbol(activeLineSymbol - 1 >= 0 ? activeLineSymbol - 1 : activeLineSymbol);
        break;
      case 'ArrowRight':
        setActiveLineSymbol(
          activeLineSymbol + 1 > getActiveLineLength() ? activeLineSymbol : activeLineSymbol + 1
        );
        break;
      case 'Home':
        setActiveLineSymbol(0);
        break;
      case 'End':
        setActiveLineSymbol(getActiveLineLength());

        break;
    }
  };

  const cursorToEnd = () => {
    setActiveLineSymbol(getActiveLineLength());
  };

  const deleteSymbol = () => {
    const lineLength = getActiveLineLength();
    const { word, position } = getCurrentWord();
    if (lineLength === 0) {
      if (activeLine === 0) {
        return;
      }
      const newArray = code.filter((item, index) => index !== activeLine);
      const newActiveLine = activeLine - 1 >= 0 ? activeLine - 1 : activeLine;
      setCode(newArray);
      setActiveLine(newActiveLine);
      setActiveLineSymbol(getActiveLineLength(activeLine - 1));
    } else {
      if (activeLineSymbol !== 0) {
        const newArray = code.map((item, index) => {
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
            setActiveLineSymbol((prevState) => prevState - 1);
            console.log(newLine);
            if (newLine.length === 0) {
              newLine = [''];
            }
            return newLine;
          }
          return item;
        });
        updateCode(newArray);
      }
      if (activeLineSymbol === 0) {
        if (activeLine === 0) {
          return;
        }
        const lineToDelete = code[activeLine];
        let newLine;
        const wordOnEndOfPrevLine = code[activeLine - 1].at(-1);
        if (wordOnEndOfPrevLine && wordOnEndOfPrevLine === ' ') {
          newLine = [...code[activeLine - 1], ...lineToDelete];
        } else {
          newLine = [
            ...code[activeLine - 1].slice(0, -1),
            code[activeLine - 1][code[activeLine - 1].length - 1] + lineToDelete[0],
            ...lineToDelete.slice(1),
          ];
        }
        const newArray = [...code.slice(0, activeLine - 1), newLine, ...code.slice(activeLine + 1)];
        console.log(getActiveLineLength(activeLine - 1));
        setActiveLineSymbol(getActiveLineLength(activeLine - 1));
        setActiveLine((prevState) => prevState - 1);
        updateCode(newArray);
      }
    }
  };
  const getWords = (text: string) => {
    const strings = text.split(/\r?\n/);
    const words = strings.map((st) => st.replace(/ /g, '  ').trim().split(/\s/));
    words.forEach(
      (word, index, arr) =>
        (arr[index] = word.map((elem) => (elem.length == 0 ? elem.replace('', ' ') : elem)))
    );
    return words;
  };
  const pasteHandler = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').trim();
    const words = getWords(text);
    const copyCode = JSON.parse(JSON.stringify(code));

    if (copyCode.length == 1 && copyCode[0] == '') {
      setCode(words);
      setActiveLine(words.length - 1);
      setActiveLineSymbol(getActiveLineLengthArr(words.length - 1, words));
    } else if (copyCode.length - 1 == activeLine) {
      const newArr = copyCode.concat(words);
      setActiveLine(newArr.length - 1);
      setActiveLineSymbol(getActiveLineLengthArr(newArr.length - 1, newArr));
      setCode(newArr);
    } else {
      const currString = copyCode[activeLine].join('');
      const currLineArr = [
        currString.slice(0, activeLineSymbol),
        text,
        currString.slice(activeLineSymbol),
      ].join('');

      const wordsNew = getWords(currLineArr);

      const newCodeArray = copyCode
        .slice(0, activeLine)
        .concat(wordsNew)
        .concat(copyCode.slice(activeLine + 1));
      setCode(newCodeArray);
      setActiveLine(activeLine + words.length - 1);
      setActiveLineSymbol(
        words.length > 1
          ? getActiveLineLengthArr(words.length - 1, words)
          : activeLineSymbol + words[0].length - 1
      );
    }
  };
  const inputEvent = async (e: React.KeyboardEvent) => {
    if (isFocus) {
      if (e.key.length === 1) {
        addNewLetter(e.key);
      } else {
        if (e.key === 'Enter') {
          addNewLine();
        }
        if (e.key === 'Tab') {
          e.preventDefault();
          addNewLetter('Tab');
        }
        if (e.key === 'End') {
          cursorToEnd();
        }
        if (e.key === 'Home') {
          setActiveLineSymbol(0);
        }
        if (e.key.includes('Arrow')) {
          arrowNavigation(e.key);
        }
        if (e.key === 'Backspace') {
          deleteSymbol();
        }
      }
    }
  };
  return (
    <div className="flex h-full">
      <div className="text-black pr-3">
        {code.map((item, index) => (
          <div
            key={index + 10}
            className={`leading-5 font-SourceCodePro text-center min-w-[20px] ${
              index === activeLine ? 'text-color-code-active' : 'text-color-code'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div
        tabIndex={0}
        className="text-black min-h-[500px] h-full grow relative font-SourceCodePro leading-5 outline-0 cursor-text"
        onFocus={focusEvent}
        onBlur={blurEvent}
        onKeyDown={inputEvent}
        onPaste={pasteHandler}
        onClick={editorClickEvent}
      >
        {code.map((item, index) => (
          <div
            className="min-h-[20px] whitespace-pre cursor-text truncate"
            key={index}
            data-line={index}
            onClick={clickNavigation}
          >
            {item.map((element, indexLetter) => (
              <span key={indexLetter} data-letter={indexLetter}>
                {element}
              </span>
            ))}
          </div>
        ))}
        <div
          className={`absolute h-[24px] w-[2px] bg-black animate-blink-cursor ${
            isFocus ? 'visible' : 'hidden'
          }`}
          style={{ top: `${height}px`, left: `${left}px` }}
        />
      </div>
    </div>
  );
}
