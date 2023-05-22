import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ISelectionData } from '@/types/editorTypes';
import { ITab, updateActiveTab } from '@/store/reducers/editorTabs/slice';

import { syntaxHighlighting } from '@/utils/syntaxHighlighting';

export function Editor() {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [activeTabInfo, setActiveTabInfo] = useState<ITab[]>();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<Array<Array<string>>>([['']]);

  useEffect(() => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (tabInfo.length) {
      setActiveTabInfo(tabInfo);
    }
  }, [activeTabId]);

  useEffect(() => {
    dispatch(updateActiveTab({ code, isRequest: true }));
  }, [code]);
  const [activeLine, setActiveLine] = useState(0);
  const [activeLineSymbol, setActiveLineSymbol] = useState(0);
  const [isFocus, setIsFocus] = useState(false);
  const [selectionOptions, setSelectionOptions] = useState<ISelectionData | undefined>(undefined);

  useEffect(() => {
    const code = activeTabInfo?.at(0)?.requestCode ?? [['']];
    setCode(JSON.parse(JSON.stringify(code)));
    setActiveLine(0);
    setActiveLineSymbol(0);
  }, [activeTabInfo]);

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
    const word = e.target?.getAttribute('data-letter');
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

  const getCurrentWord = (codeActiveLine?: Array<string>, lineCursor?: number) => {
    const currentLine = codeActiveLine ?? code[activeLine];
    const cursor = lineCursor ?? activeLineSymbol;
    let sumLength = 0;
    let word = 0;
    do {
      sumLength += currentLine[word].length;
      word += 1;
    } while (sumLength < cursor);
    return {
      word,
      position: currentLine[word - 1].length - (sumLength - cursor),
    };
  };

  const addNewLetter = (
    letter: string,
    array?: Array<Array<string>>,
    newActiveLine?: number,
    cursorPosition?: number
  ) => {
    const arrayWithCode = array ?? code;
    const codeActiveLine = newActiveLine ?? activeLine;
    const lineCursorPosition = cursorPosition ?? activeLineSymbol;
    let newCodeArray;
    const { word, position } = getCurrentWord(arrayWithCode[codeActiveLine], lineCursorPosition);
    if (!letter.match(/\w|[А-я|$|_]/gm) || letter === 'Tab') {
      newCodeArray = arrayWithCode.map((item, index) => {
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
    } else {
      newCodeArray = arrayWithCode.map((item, index) => {
        if (index === codeActiveLine) {
          let addToCount = 0;
          if (!item[word - 1].match(/\w|[А-я|$|_]/gm)) {
            item = [...item.slice(0, word), '', ...item.slice(word)];
            addToCount += 1;
          }
          const newLineArray = item[word + addToCount - 1].split('');
          newLineArray.splice(position, 0, letter);
          const newLine = newLineArray.join('');
          return [
            ...item.slice(0, word - 1 + addToCount),
            newLine,
            ...item.slice(word + addToCount),
          ];
        }
        if (item.length === 1 && item[0] === '') {
          return item;
        } else {
          return item.filter((str) => str !== '');
        }
      });
    }
    if (letter === 'Tab') {
      setActiveLineSymbol(lineCursorPosition + 2);
    } else {
      setActiveLineSymbol(lineCursorPosition + 1);
    }
    updateCode(newCodeArray);
  };

  const addNewLine = (
    array?: Array<Array<string>>,
    newActiveLine?: number,
    cursorPosition?: number
  ) => {
    let newArray;
    const arrayWithCode = array ?? code;
    const codeActiveLine = newActiveLine ?? activeLine;
    const lineCursorPosition = cursorPosition ?? activeLineSymbol;
    const lineLength = getActiveLineLengthArr(codeActiveLine, arrayWithCode);
    if (activeLineSymbol === lineLength) {
      newArray = [
        ...arrayWithCode.slice(0, codeActiveLine + 1),
        [''],
        ...arrayWithCode.slice(codeActiveLine + 1),
      ];
    } else {
      const { word, position } = getCurrentWord(arrayWithCode[codeActiveLine], lineCursorPosition);
      let restLine = [''];
      newArray = arrayWithCode.map((item, index) => {
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
    setActiveLine(codeActiveLine + 1);
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

  const backspaceSymbol = () => {
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
        setActiveLineSymbol(getActiveLineLength(activeLine - 1));
        setActiveLine((prevState) => prevState - 1);
        updateCode(newArray);
      }
    }
  };

  const deleteSymbol = () => {
    const lineLength = getActiveLineLength();
    const { word, position } = getCurrentWord();
    if (activeLine == code.length - 1 && activeLineSymbol == lineLength) {
      return;
    } else {
      if (activeLineSymbol == lineLength) {
        const newString = [...code[activeLine], ...code[activeLine + 1]];
        const newArray = [...code.slice(0, activeLine), newString, ...code.slice(activeLine + 2)];
        updateCode(newArray);
      } else {
        const line = code[activeLine];
        const editWord = [
          line[word - 1].slice(0, position),
          line[word - 1].slice(position + 1),
        ].join('');
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
        const newArray = [...code.slice(0, activeLine), newLine, ...code.slice(activeLine + 1)];
        updateCode(newArray);
      }
    }
  };
  const getWords = (text: string) => {
    const strings = text.split(/\r?\n/);
    const words = strings.map((st) => st.replace(/ /g, '  ').split(/\s/));
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

  const setSelectionCode = (
    lineStart: number,
    wordStart: number,
    wordStartOffset: number,
    lineEnd: number,
    wordEnd: number,
    wordEndOffset: number
  ) => {
    const selectionOptions: ISelectionData = {
      startSelection: {
        lineStart,
        wordStart,
        wordStartOffset,
      },
      endSelection: {
        lineEnd,
        wordEnd,
        wordEndOffset,
      },
    };
    setSelectionOptions(selectionOptions);
  };

  const getStartPartOfLine = (line: Array<string>, start: number, offset: number) => {
    return [...line.slice(0, start), line[start].split('').slice(0, offset).join('')];
  };

  const getEndPartOfLine = (line: Array<string>, start: number, offset: number) => {
    return [line[start].split('').slice(offset).join(''), ...line.slice(start + 1)];
  };

  const deleteSelectedText = () => {
    if (selectionOptions) {
      const newArray = code.filter(
        (item, index) =>
          index < selectionOptions.startSelection.lineStart ||
          index > selectionOptions.endSelection.lineEnd
      );
      const lineStart = getStartPartOfLine(
        code[selectionOptions.startSelection.lineStart],
        selectionOptions.startSelection.wordStart,
        selectionOptions.startSelection.wordStartOffset
      );
      const endLine = getEndPartOfLine(
        code[selectionOptions.endSelection.lineEnd],
        selectionOptions.endSelection.wordEnd,
        selectionOptions.endSelection.wordEndOffset
      );
      let newLine;
      if (lineStart.at(-1) === '') {
        newLine = [...lineStart.slice(0, -1), ...endLine];
      }
      if (lineStart.at(-1) === ' ') {
        newLine = [...lineStart, ...endLine];
      }
      if (lineStart.at(-1)?.match(/\w|[А-я]/gm)) {
        if (endLine.length) {
          newLine = [
            ...lineStart.slice(0, -1),
            lineStart[lineStart.length - 1] + endLine.at(0),
            ...endLine.slice(1),
          ];
        } else {
          newLine = [...lineStart];
        }
      }
      if (lineStart.at(-1) === undefined) {
        if (endLine) {
          newLine = [...endLine];
        } else {
          newLine = [''];
        }
      }
      if (newLine) {
        newArray.splice(selectionOptions.startSelection.lineStart, 0, newLine);
      } else {
        console.error('New line is undefined!');
      }
      setActiveLine(selectionOptions.startSelection.lineStart);
      const newActiveLine = selectionOptions.startSelection.lineStart;
      const firstLineLength = lineStart.join('').length;
      setActiveLineSymbol(firstLineLength);
      updateCode(newArray);
      return { newArray, newActiveLine, firstLineLength };
    }
  };

  const mouseUpHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (selection) {
      const lineStart = Number(selection.anchorNode?.parentElement?.getAttribute('data-line'));
      const wordStart = Number(selection.anchorNode?.parentElement?.getAttribute('data-letter'));
      const wordStartOffset = Number(selection.anchorOffset);
      const lineEnd = Number(selection.focusNode?.parentElement?.getAttribute('data-line'));
      const wordEnd = Number(selection.focusNode?.parentElement?.getAttribute('data-letter'));
      const wordEndOffset = Number(selection.focusOffset);
      if (
        lineStart >= 0 &&
        wordStart >= 0 &&
        wordStartOffset >= 0 &&
        lineEnd >= 0 &&
        wordEnd >= 0 &&
        wordEndOffset >= 0
      ) {
        if (!selection.isCollapsed) {
          let isReverse = false;
          if (lineEnd < lineStart) {
            isReverse = true;
          }
          if (lineStart === lineEnd) {
            if (wordEnd < wordStart) {
              isReverse = true;
            }
            if (wordStart === wordEnd) {
              if (wordEndOffset < wordStartOffset) {
                isReverse = true;
              }
            }
          }
          if (isReverse) {
            setSelectionCode(
              lineEnd,
              wordEnd,
              wordEndOffset,
              lineStart,
              wordStart,
              wordStartOffset
            );
          } else {
            setSelectionCode(
              lineStart,
              wordStart,
              wordStartOffset,
              lineEnd,
              wordEnd,
              wordEndOffset
            );
          }
        } else {
          console.log('Only click');
        }
      } else {
        console.log('Selection not found');
      }
    }
    editorClickEvent();
  };
  const inputEvent = async (e: React.KeyboardEvent) => {
    if (isFocus) {
      if (!e.altKey && !e.ctrlKey) {
        let newArray;
        let newActiveLine;
        let newCursorPosition;
        if (selectionOptions && !window.getSelection()?.isCollapsed) {
          const obj = deleteSelectedText();
          if (obj) {
            newArray = obj.newArray;
            newActiveLine = obj.newActiveLine;
            newCursorPosition = obj.firstLineLength;
          }
          window.getSelection()?.empty();
        }
        if (e.key.length === 1) {
          addNewLetter(e.key, newArray, newActiveLine, newCursorPosition);
        } else {
          if (e.key === 'Enter') {
            addNewLine(newArray, newActiveLine, newCursorPosition);
          }
          if (e.key === 'Tab') {
            e.preventDefault();
            addNewLetter('Tab', newArray, newActiveLine, newCursorPosition);
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
          if (e.key === 'Backspace' || e.key === 'Delete') {
            if (
              newCursorPosition !== undefined &&
              newArray !== undefined &&
              newActiveLine !== undefined
            ) {
              updateCode(newArray);
              setActiveLine(newActiveLine);
              setActiveLineSymbol(newCursorPosition);
            } else {
              if (e.key === 'Backspace') {
                backspaceSymbol();
              } else {
                deleteSymbol();
              }
            }
          }
        }
      }
    }
  };
  return (
    <div className="flex overflow-auto">
      <div className="text-black pr-3">
        {code.map((item, index) => (
          <div
            key={index + 10}
            className={`leading-5 font-SourceCodePro text-center min-w-[20px] select-none ${
              index === activeLine ? 'text-color-code-active' : 'text-color-code'
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div
        tabIndex={0}
        className="text-black max-w-full  h-full grow relative font-SourceCodePro leading-5 outline-0 cursor-text"
        onFocus={focusEvent}
        onBlur={blurEvent}
        onKeyDown={inputEvent}
        onMouseUpCapture={mouseUpHandler}
        onPaste={pasteHandler}
      >
        {code.map((item, index) => (
          <div
            className="min-h-[20px] whitespace-pre cursor-text overflow-hidden  max-w-full"
            key={index}
            data-line={index}
            onClick={clickNavigation}
          >
            {item.map((element, indexLetter) => (
              <span
                className={syntaxHighlighting(item, index, element)}
                key={indexLetter}
                data-letter={indexLetter}
                data-line={index}
              >
                {element}
              </span>
            ))}
          </div>
        ))}
        <div
          className={`absolute h-[24px] w-[2px] bg-black select-none animate-blink-cursor ${
            isFocus ? 'visible' : 'hidden'
          }`}
          style={{ top: `${height}px`, left: `${left}px` }}
        />
      </div>
    </div>
  );
}
