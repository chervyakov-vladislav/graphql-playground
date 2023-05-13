export const capitalize = (item: string) =>
  item
    .split('')
    .map((item, index) => (index === 0 ? item.toUpperCase() : item))
    .join('');
