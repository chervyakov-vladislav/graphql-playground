import React, { useEffect, useState } from 'react';
import { TabsContainer } from '@/components/Editor/TabsContainer/TabsContainer';
import { Grid } from '@mui/material';
import { useAppSelector } from '@/hooks/redux';
import { EditorHeader } from '@/components/Editor/EditorHeader/EditorHeader';

export const EditorContainer = () => {
  const { tabs, activeTabId } = useAppSelector((state) => state.editorTab);
  const [isFocus, setIsFocus] = useState(false);
  const [code, setCode] = useState<Array<Array<string>>>([['']]);
  const [activeLine, setActiveLine] = useState(0);
  const [activeLineSymbol, setActiveLineSymbol] = useState(0);
  const [requestCode, setRequestCode] = useState('');
  const [responseCode, setResponseCode] = useState('');

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

  let height = activeLine * 20;
  let left = activeLineSymbol * 9.7;
  useEffect(() => {
    height = activeLine * 24;
    if (code[activeLine].length < activeLineSymbol) {
      setActiveLineSymbol(code[activeLine].length);
    }
  }, [activeLine]);
  useEffect(() => {
    left = activeLineSymbol * 9;
  }, [activeLineSymbol]);

  const cursorToTop = () => {
    setActiveLine(activeLine - 1 >= 0 ? activeLine - 1 : activeLine);
  };

  const cursorToDown = () => {
    setActiveLine(activeLine + 2 > code.length ? activeLine : activeLine + 1);
  };

  const cursorToRight = () => {
    setActiveLineSymbol(
      activeLineSymbol + 1 > code[activeLine][activeLineSymbol].length
        ? activeLineSymbol
        : activeLineSymbol + 1
    );
  };

  const cursorToLeft = () => {
    setActiveLineSymbol(activeLineSymbol - 1 >= 0 ? activeLineSymbol - 1 : activeLineSymbol);
  };

  const toUpOnLastItem = () => {
    setActiveLineSymbol(code[activeLine].length);
  };

  const inputEvent = async (e: React.KeyboardEvent) => {
    if (isFocus) {
      if (e.key.length === 1) {
        const newArray = code.map((item, index) => {
          if (index === activeLine) {
            const itemArray = item;
            itemArray.splice(activeLineSymbol, 0, e.key);
            return itemArray;
          } else {
            return item;
          }
        });
        setActiveLineSymbol(activeLineSymbol + 1);
        setCode(newArray);
      } else {
        if (e.key === 'Enter') {
          let line = '';
          if (activeLineSymbol < code[activeLine].length) {
            line = code[activeLine].slice(activeLineSymbol).join('');
          }
          console.log(code.slice(activeLine, 0));
          const newArray = [
            ...code.slice(0, activeLine),
            code[activeLine].slice(0, activeLineSymbol),
            line.split(''),
            ...code.slice(activeLine + 1),
          ];
          console.log(newArray);
          setCode(newArray);
          setActiveLineSymbol(0);
          setActiveLine(activeLine + 1);
          console.log(code);
        }
        if (e.key.includes('Arrow')) {
          if (e.key === 'ArrowUp') {
            cursorToTop();
          }
          if (e.key === 'ArrowDown') {
            cursorToDown();
          }
          if (e.key === 'ArrowLeft') {
            cursorToLeft();
          }
          if (e.key === 'ArrowRight') {
            cursorToRight();
          }
        }
        if (e.key === 'Backspace') {
          if (code[activeLine].length !== 0) {
            if (activeLineSymbol !== 0) {
              const newArray = code.map((item, index) => {
                if (index === activeLine) {
                  const str = item;
                  str.splice(activeLineSymbol - 1, 1);
                  return str;
                } else {
                  return item;
                }
              });
              cursorToLeft();
              setCode(newArray);
            } else {
              if (activeLine === 0) {
                return;
              }

              const line = code[activeLine];
              const newArray = code.map((item, index) => {
                if (index + 1 === activeLine) {
                  item.push(...line);
                  return item;
                }
                if (index === activeLine) {
                  return undefined;
                }
                return item;
              });
              const nArray = newArray.filter((item) => item !== undefined);
              setCode(nArray as Array<Array<string>>);
              toUpOnLastItem();
            }
          } else {
            const newArray = code.filter((item, index) => index !== activeLine);
            const newActiveLine = activeLine - 1 >= 0 ? activeLine - 1 : activeLine;
            setCode(newArray);
            setActiveLine(newActiveLine);
            toUpOnLastItem();
          }
        }
      }
    }
  };

  return (
    <div className={'pt-12'}>
      <TabsContainer />
      <Grid
        className={'pl-4'}
        container
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item sm={6} xs={12}>
          <div className={'flex mt-[8px] min-h-[78vh] bg-white rounded-lg'}>
            <div className={'p-8 grow'}>
              <EditorHeader />
              <div
                tabIndex={0}
                className="text-black min-h-[500px] relative font-SourceCodePro leading-5 outline-0"
                onFocus={focusEvent}
                onBlur={blurEvent}
                onKeyDown={inputEvent}
              >
                {code.map((item, index) => (
                  <div className={'min-h-[20px] whitespace-pre cursor-text truncate'} key={index}>
                    {item.map((element, index) => (
                      <span key={index}>{element}</span>
                    ))}
                  </div>
                ))}
                <div
                  className={`absolute h-[24px] w-[2px] bg-black animate-blink-cursor ${
                    isFocus ? 'visible' : 'hidden'
                  }`}
                  style={{ top: `${height}px`, left: `${left}px` }}
                ></div>
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
};
