export const syntaxHighlighting = (line: string[], index: number, element: string) => {
  line = line.filter((item) => item !== ' ');
  if (line.length === 0) return '';

  // логика первой линии
  if (index === 0 && line[0].length > 0) {
    // логика для первого слова query/mutation/subscription
    if (line[0] && (element === 'query' || element === 'mutation' || element === 'subscription')) {
      return 'query-highlight';
    }
    if (line[0] !== 'query' && line[0] !== 'mutation' && line[0] !== 'subscription') {
      return 'text-color-code';
    }

    if (element.includes('$')) {
      return 'variable-highlight';
    }

    if (element.match(/[\p{Alpha}]/gu)) {
      return 'function-highlight';
    }

    return '';
  }

  // логика остальных линий
  if (element.includes('$')) {
    return 'variable-highlight';
  }

  if (index && element.match(/[\p{Alpha}]/gu)) {
    return 'fields-highlight';
  }

  return '';
};
