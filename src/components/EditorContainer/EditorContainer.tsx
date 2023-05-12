import React, { useEffect, useState } from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { useAppSelector } from '@/hooks/redux';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';

export function EditorContainer() {
  const { tabs, activeTabId } = useAppSelector((state) => state.editorTab);
  const [isFocus, setIsFocus] = useState(false);
  const [code, setCode] = useState<Array<Array<string>>>([['']]);
  const [activeLine, setActiveLine] = useState(0);
  const [activeLineSymbol, setActiveLineSymbol] = useState(0);
  const [activeLineWord, setActiveLineWord] = useState(0);
  const [requestCode, setRequestCode] = useState('');
  const [responseCode, setResponseCode] = useState('');
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
      setResponseCode(item.responseCode);
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

  const getActiveLineLength = () => {
    return code[activeLine].reduce((acc, item) => acc + item.length, 0);
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
          console.log(item[word]);
          const itemArray = [
            ...item.slice(0, word - 1),
            item[word - 1].slice(0, position),
            ' ',
            item[word - 1].slice(position),
            ...item.slice(word),
          ];
          console.log(itemArray);
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
    const newArray = [...code.slice(0, activeLine + 1), [''], ...code.slice(activeLine + 1)];
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
    if (lineLength === 0) {
      const newArray = code.filter((item, index) => index !== activeLine);
      const newActiveLine = activeLine - 1 >= 0 ? activeLine - 1 : activeLine;
      setCode(newArray);
      setActiveLine(newActiveLine);
      setActiveLineSymbol(getActiveLineLength());
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
    <div className="pt-12">
      <TabsContainer />
      <Grid
        className="pl-4"
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item sm={6} xs={12}>
          <div className="flex mt-[8px] min-h-[78vh] bg-white rounded-lg">
            <div className="p-8 grow">
              <EditorHeader />
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
            </div>
          </div>
        </Grid>
        <Grid item sm={6} xs={12}>
          {responseCode}
        </Grid>
      </Grid>
    </div>
  );
}
