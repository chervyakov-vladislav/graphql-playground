import { FULL_TYPE } from './fragments';

export const getTypeFields = (type: string) => /* GraphQL */ `${FULL_TYPE}

query introspectionType {
  __type(name: "${type}") {
    ...FullType
  }
}
`;
