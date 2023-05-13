import generated from './graphql.schema.json';
import { RootState } from '@/store/store';

export const schemaParams = generated;

export type Schema = typeof schemaParams;

export interface ActionHydrate {
  payload: RootState;
  type: string;
}

export type Data = {
  data: Schema;
};

export interface Fields {
  name: string;
  args: Args[];
  type: OfType;
}

export interface Args {
  name: string;
  defaultValue: null;
  type: OfType;
}

export interface OfType {
  ofType: OfType;
  name: null | string;
  kind: string;
}

export interface NavObj {
  name: string;
  prevArgs: Args[];
  prevFields: Fields[];
  prevSchema: Data | null;
}
