export interface OfType {
  ofType: OfType;
  name: null | string;
  kind: string;
}

export interface ResultType {
  text: string;
  listOf: string;
  kind: string;
}

export function getType(type?: OfType): ResultType {
  let result = '';
  let list = false;
  let kind = '';

  function computeType(type?: OfType): string | undefined {
    if (!type) return;
    if (type.kind === 'LIST') list = true;
    if (type.name) {
      result = type.name;
      kind = type.kind;
    }
    computeType(type.ofType);
  }

  computeType(type);

  return list
    ? {
        text: `[${result}]`,
        listOf: result,
        kind,
      }
    : {
        text: result,
        listOf: result,
        kind,
      };
}
