import { TYPE_REF, INPUT_VALUE } from './fragments';

export const ROOT_QUERY = `${TYPE_REF + INPUT_VALUE}
{
  __schema {
    queryType {
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
    mutationType {
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
    subscriptionType {
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
