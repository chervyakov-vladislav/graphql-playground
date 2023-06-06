export const capitalize = (item: string) =>
  item
    .split('')
    .map((item, index) => (index === 0 ? item.toUpperCase() : item))
    .join('');

export const joinTextFromArr = (textArr: Array<Array<string>>) => {
  const joinedStr = textArr.map((st) => st.join(''));
  return joinedStr.join('\n');
};
