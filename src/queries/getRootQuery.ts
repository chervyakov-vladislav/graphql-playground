import { INPUT_VALUE, TYPE_REF } from '@/queries/fragments';

export const getRootListQuery = (operationType?: string) => {
  switch (operationType) {
    case 'query':
      return getRootList(operationType);
    case 'mutation':
      return getRootList(operationType);
    case 'subscription':
      return getRootList(operationType);
    default:
      return getRootList('query');
  }
};

const getRootList = (param: string) => /* GraphQL */ `${TYPE_REF + INPUT_VALUE}
{
  __schema {
    ${param}Type {
      name
      ...TypeRef
      fields {
        name
        type {
          ...TypeRef
        }
        args {
          ...InputValue
        }
      }
    }
  }
}`;
