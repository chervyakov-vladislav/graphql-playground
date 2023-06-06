import React, { useEffect, useRef, useState } from 'react';
import { ISelectionData, IUndoData } from '@/types/editorTypes';
import { ITab, updateActiveTab } from '@/store/reducers/editorTabs/slice';
import { isMobile } from 'react-device-detect';

import { syntaxHighlighting } from '@/utils/syntaxHighlighting';
import {
  addNewLetterFnc,
  addNewLineFnc,
  backspaceLineWithContent,
  backspaceSymbolInMiddle,
  deleteSymbolFnc,
  getWords,
} from '@/utils/editorHelpers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export function Editor() {
  const { activeTabId, tabs } = useAppSelector((state) => state.editorTab);
  const [activeTabInfo, setActiveTabInfo] = useState<ITab[]>();
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<Array<Array<string>>>([['']]);
  const [undo, setUndo] = useState<Array<IUndoData>>();
  const [undoOffset, setUndoOffset] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const tabInfo = tabs.filter((item) => item.id == activeTabId);
    if (tabInfo.length) {
      setActiveTabInfo(tabInfo);
    }
    setUndo(undefined);
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

  const addNewUndo = (
    editedCode: Array<Array<string>>,
    cursorLine: number,
    cursorSymbol: number
  ) => {
    const obj = { code: editedCode, cursorLine, cursorSymbol };
    if (undo?.length) {
      let undoArr: IUndoData[] | undefined;
      if (undoOffset) {
        undoArr = undo.slice(0, undo.length - undoOffset);
        setUndoOffset(0);
      }
      const result = undoArr ?? undo;
      if (result.length === 10) {
        setUndo([...result.slice(1), obj]);
      } else {
        setUndo([...result, obj]);
      }
    } else {
      setUndo([{ code, cursorSymbol: activeLineSymbol, cursorLine: activeLine }, obj]);
    }
  };

  const undoRedoFnc = (isUndo: boolean) => {
    if (undo && undo.length) {
      let obj;
      if (isUndo) {
        obj = undo[undo.length - 1 - undoOffset - 1];
      } else {
        obj = undo[undo.length - 1 - undoOffset + 1];
      }
      if (obj) {
        setCode(obj.code);
        setActiveLine(obj.cursorLine);
        setActiveLineSymbol(obj.cursorSymbol);
        isUndo
          ? setUndoOffset((prevState) => prevState + 1)
          : setUndoOffset((prevState) => prevState - 1);
      }
    }
  };

  const clickNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      if (ref.current) {
        ref.current.value = '';
        ref.current.focus();
      }
    }
    const line = e.currentTarget.getAttribute('data-line');
    const target = e.target as HTMLElement;
    const word = Number(target?.getAttribute('data-letter'));
    const position = window.getSelection()?.focusOffset;
    if (line) {
      setActiveLine(Number(line));
    }
    if (word >= 0 && target.tagName === 'SPAN') {
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
    if (!window.getSelection()?.isCollapsed && window.getSelection()?.type !== 'None') {
      window.getSelection()?.removeAllRanges();
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

  const getActiveLineLength = (line?: number, array?: Array<Array<string>>) => {
    const lineToCalc = line ?? activeLine;
    const codeArray = array ?? code;
    return codeArray[lineToCalc].reduce((acc, item) => acc + item.length, 0);
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
    const { word, position } = getCurrentWord(arrayWithCode[codeActiveLine], lineCursorPosition);
    const newCodeArray = addNewLetterFnc(arrayWithCode, codeActiveLine, word, position, letter);
    let newSymbolPosition;
    if (letter === 'Tab') {
      newSymbolPosition = lineCursorPosition + 2;
    } else {
      newSymbolPosition = lineCursorPosition + 1;
    }
    setActiveLineSymbol(newSymbolPosition);
    updateCode(newCodeArray);
    addNewUndo(newCodeArray, codeActiveLine, newSymbolPosition);
  };

  const addNewLine = (
    array?: Array<Array<string>>,
    newActiveLine?: number,
    cursorPosition?: number
  ) => {
    const arrayWithCode = array ?? code;
    const codeActiveLine = newActiveLine ?? activeLine;
    const lineCursorPosition = cursorPosition ?? activeLineSymbol;
    const lineLength = getActiveLineLength(codeActiveLine, arrayWithCode);
    const { word, position } = getCurrentWord(arrayWithCode[codeActiveLine], lineCursorPosition);
    const newArray = addNewLineFnc(
      arrayWithCode,
      activeLineSymbol,
      lineLength,
      codeActiveLine,
      word,
      position
    );
    setActiveLine(codeActiveLine + 1);
    setActiveLineSymbol(0);
    updateCode(newArray);
    addNewUndo(newArray, codeActiveLine + 1, 0);
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
    let newLinePosition;
    let newSymbolPosition;
    if (lineLength === 0 && activeLine === 0) {
      return;
    }
    if (lineLength === 0) {
      const newArray = code.filter((item, index) => index !== activeLine);
      const newActiveLine = activeLine - 1 >= 0 ? activeLine - 1 : activeLine;
      setCode(newArray);
      setActiveLine(newActiveLine);
      newSymbolPosition = getActiveLineLength(activeLine - 1);
      setActiveLineSymbol(newSymbolPosition);
      addNewUndo(newArray, newActiveLine, newSymbolPosition);
    } else {
      let newArray;
      if (activeLineSymbol !== 0) {
        newArray = backspaceSymbolInMiddle(
          code,
          activeLine,
          word,
          position,
          activeLineSymbol,
          getActiveLineLength
        );
        newSymbolPosition = activeLineSymbol - 1;
        setActiveLineSymbol((prevState) => prevState - 1);
        newLinePosition = activeLine;
      } else {
        if (activeLine === 0) {
          return;
        }
        newArray = backspaceLineWithContent(code, activeLine);
        newSymbolPosition = getActiveLineLength(activeLine - 1);
        newLinePosition = activeLine - 1;
      }
      setActiveLineSymbol(newSymbolPosition);
      setActiveLine(newLinePosition);
      updateCode(newArray);
      addNewUndo(newArray, newLinePosition, newSymbolPosition);
    }
  };

  const deleteSymbol = () => {
    const lineLength = getActiveLineLength();
    const { word, position } = getCurrentWord();
    if (activeLine == code.length - 1 && activeLineSymbol == lineLength) {
      return;
    } else {
      const newArray = deleteSymbolFnc(
        code,
        activeLineSymbol,
        lineLength,
        activeLine,
        word,
        position
      );
      updateCode(newArray);
      addNewUndo(newArray, activeLine, activeLineSymbol);
    }
  };
  const pasteHandler = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').trim();
    const words = getWords(text);
    const copyCode = JSON.parse(JSON.stringify(code));

    if (copyCode.length == 1 && copyCode[0] == '') {
      setCode(words);
      setActiveLine(words.length - 1);
      setActiveLineSymbol(getActiveLineLength(words.length - 1, words));
    } else if (copyCode.length - 1 == activeLine) {
      const newArr = copyCode.concat(words);
      setActiveLine(newArr.length - 1);
      setActiveLineSymbol(getActiveLineLength(newArr.length - 1, newArr));
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
          ? getActiveLineLength(words.length - 1, words)
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
    let currentLine = start;
    if (!line.at(currentLine)) {
      while (!line.at(currentLine)) {
        currentLine -= 1;
      }
    }
    return [line[currentLine].split('').slice(offset).join(''), ...line.slice(currentLine + 1)];
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
          // console.log('Only click');
        }
      } else {
        // console.log('Selection not found');
      }
    }
    editorClickEvent();
  };
  const handleMobile = (e: unknown) => {
    const keyEvent = e as React.KeyboardEvent;
    const valueEvent = e as React.ChangeEvent<HTMLInputElement>;
    const key = keyEvent.which || keyEvent.keyCode;
    if (isNaN(valueEvent.target.value.charCodeAt(0)) || key == 8) {
      backspaceSymbol();
    } else {
      const letter = valueEvent.target.value.substr(-1);

      addNewLetter(letter);
    }
    if (ref.current) ref.current.value = '';
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
        } else {
          window.getSelection()?.removeAllRanges();
        }
        if (e.key.length === 1) {
          addNewLetter(e.key, newArray, newActiveLine, newCursorPosition);
        } else {
          e.preventDefault();
          if (e.key === 'Enter') {
            addNewLine(newArray, newActiveLine, newCursorPosition);
          }
          if (e.key === 'Tab') {
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
      } else {
        if (e.ctrlKey && (e.key === 'z' || e.key === 'Z' || e.key === 'я' || e.key === 'Я')) {
          undoRedoFnc(true);
        }
        if (e.ctrlKey && (e.key === 'y' || e.key === 'Y' || e.key === 'н' || e.key === 'Н')) {
          undoRedoFnc(false);
        }
      }
    }
  };
  return (
    <div className="flex pt-8 min-h-[50vh]" onMouseUpCapture={mouseUpHandler}>
      <div className="text-black pr-3 select-none">
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
        className="text-black caret-transparent max-w-full grow relative font-SourceCodePro leading-5 outline-0 cursor-text"
        onFocus={focusEvent}
        onBlur={blurEvent}
        onKeyDown={inputEvent}
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

      {isMobile && <input ref={ref} onKeyUp={handleMobile} className={'w-0 opacity-0'} />}
    </div>
  );
}
