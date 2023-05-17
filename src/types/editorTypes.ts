export interface ISelectionData {
  startSelection: {
    lineStart: number;
    wordStart: number;
    wordStartOffset: number;
  };
  endSelection: {
    lineEnd: number;
    wordEnd: number;
    wordEndOffset: number;
  };
}
