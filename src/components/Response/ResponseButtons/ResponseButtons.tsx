import { ResponseButton } from '@/components/ui/ResponseButton/ResponseButton';
import { ClipboardStatic } from '@/components/ui/ClipboardSVG/ClipboardStatic';
import { ClipboardSuccess } from '@/components/ui/ClipboardSVG/ClipboardSuccess';
import { DownloadResponseSVG } from '@/components/ui/DownloadResponseSVG/DownloadResponseSVG';
import React, { useState } from 'react';

interface IProps {
  response: string;
}

export function ResponseButtons(props: IProps) {
  const [clipboardClicked, setClipboardClicked] = useState(false);
  const copyResponse = async () => {
    await navigator.clipboard.writeText(props.response);
    setClipboardClicked(true);
    setTimeout(() => {
      setClipboardClicked(false);
    }, 500);
  };

  const downloadResponseFile = () => {
    if (props.response) {
      const blob = new Blob([props.response], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'response.json';
      link.href = url;
      link.click();
    }
  };
  return (
    <div className="absolute top-0 right-5">
      <ResponseButton onClickFnc={copyResponse}>
        {!clipboardClicked ? <ClipboardStatic /> : <ClipboardSuccess />}
      </ResponseButton>
      <ResponseButton onClickFnc={downloadResponseFile}>
        <DownloadResponseSVG />
      </ResponseButton>
    </div>
  );
}
