import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/redux';

export function Editor() {
  const [code, setCode] = useState<Array<Array<string>>>([['']]);
  const [activeLine, setActiveLine] = useState(0);
  const [activeLineSymbol, setActiveLineSymbol] = useState(0);
  const [activeLineWord, setActiveLineWord] = useState(0);
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

  const test = () => {
    console.log(window.getSelection());
  };

  const updateCode = (newCodeArray: Array<Array<string>>) => {
    setCode(newCodeArray);
  };

  const getActiveLineLength = (line?: number) => {
    const lineToCalc = line ?? activeLine;
    return code[lineToCalc].reduce((acc, item) => acc + item.length, 0);
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
    if (letter === ' ') {
      newCodeArray = code.map((item, index) => {
        if (index === activeLine) {
          const itemArray = [
            ...item.slice(0, word - 1),
            item[word - 1].slice(0, position),
            ' ',
            item[word - 1].slice(position),
            ...item.slice(word),
          ];
          return itemArray;
        }
        return item;
      });
      setActiveLineWord((prevState) => prevState + 1);
    } else {
      newCodeArray = code.map((item, index) => {
        if (index === activeLine) {
          let addToCount = 0;
          if (item[word - 1] === ' ') {
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
          setActiveLineWord(word - 1 + addToCount);
          return newItem;
        }
        return item;
      });
    }
    setActiveLineSymbol((prevState) => prevState + 1);
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
    setActiveLineWord(0);
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
    }
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

  const inputEvent = async (e: React.KeyboardEvent) => {
    if (isFocus) {
      if (e.key.length === 1) {
        addNewLetter(e.key);
      } else {
        if (e.key === 'Enter') {
          addNewLine();
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
    <div
      tabIndex={0}
      className="text-black min-h-[500px] h-full grow relative font-SourceCodePro leading-5 outline-0 cursor-text"
      onFocus={focusEvent}
      onBlur={blurEvent}
      onKeyDown={inputEvent}
    >
      {code.map((item, index) => (
        <div
          className="min-h-[20px] whitespace-pre cursor-text truncate"
          key={index}
          data-line={index}
          onClick={test}
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
  );
}
