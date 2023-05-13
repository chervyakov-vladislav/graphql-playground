import { FULL_TYPE } from './fragments';

export const getTypeFields = (type: string) => `${FULL_TYPE}

query introspectionType {
  __type(name: "${type}") {
    ...FullType
  }
}
`;
