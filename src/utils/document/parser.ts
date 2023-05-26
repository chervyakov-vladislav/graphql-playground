import {
  IntrospectionObjectType,
  IntrospectionQuery,
  IntrospectionType,
} from '@/types/intorspectionTypes';
import { OfType, getType } from './getType';

export const parser = (currentType: string, data: IntrospectionQuery) => {
  const newType = data.__schema.types.find(({ name }) => name === currentType) as IntrospectionType;
  console.log(data.__schema);

  switch (newType.kind) {
    case 'OBJECT':
      const newObjectType: IntrospectionObjectType = newType as IntrospectionObjectType;
      return getObjectTypeValues(newObjectType);
    default:
      return null;
  }
};

function getObjectTypeValues(currentType: IntrospectionObjectType) {
  return currentType.fields.map((field) => {
    const fieldType: OfType = field.type as OfType;
    return {
      name: field.name,
      type: getType(fieldType),
      args: field.args,
    };
  });
}
