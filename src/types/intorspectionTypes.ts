export interface IntrospectionQuery {
  __schema: IntrospectionSchema;
}

export interface IntrospectionSchema {
  description?: Maybe<string>;
  queryType: IntrospectionNamedTypeRef<IntrospectionObjectType>;
  mutationType: Maybe<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
  subscriptionType: Maybe<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
  types: ReadonlyArray<IntrospectionType>;
  directives: ReadonlyArray<IntrospectionDirective>;
}

export type IntrospectionType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export type IntrospectionOutputType =
  | IntrospectionScalarType
  | IntrospectionObjectType
  | IntrospectionInterfaceType
  | IntrospectionUnionType
  | IntrospectionEnumType;

export type IntrospectionInputType =
  | IntrospectionScalarType
  | IntrospectionEnumType
  | IntrospectionInputObjectType;

export interface IntrospectionScalarType {
  readonly kind: 'SCALAR';
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly specifiedByURL?: Maybe<string>;
}

export interface IntrospectionObjectType {
  readonly kind: 'OBJECT';
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly fields: ReadonlyArray<IntrospectionField>;
  readonly interfaces: ReadonlyArray<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
}

export interface IntrospectionInterfaceType {
  readonly kind: 'INTERFACE';
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly fields: ReadonlyArray<IntrospectionField>;
  readonly interfaces: ReadonlyArray<IntrospectionNamedTypeRef<IntrospectionInterfaceType>>;
  readonly possibleTypes: ReadonlyArray<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
}

export interface IntrospectionUnionType {
  readonly kind: 'UNION';
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly possibleTypes: ReadonlyArray<IntrospectionNamedTypeRef<IntrospectionObjectType>>;
}

export interface IntrospectionEnumType {
  readonly kind: 'ENUM';
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly enumValues: ReadonlyArray<IntrospectionEnumValue>;
}

export interface IntrospectionInputObjectType {
  readonly kind: 'INPUT_OBJECT';
  readonly name: string;
  readonly description?: Maybe<string>;
  inputFields: Array<IntrospectionInputValue>;
}

export interface IntrospectionListTypeRef<T extends IntrospectionTypeRef = IntrospectionTypeRef> {
  readonly kind: 'LIST';
  readonly ofType: T;
}

export interface IntrospectionNonNullTypeRef<
  T extends IntrospectionTypeRef = IntrospectionTypeRef
> {
  readonly kind: 'NON_NULL';
  readonly ofType: T;
}

export type IntrospectionTypeRef =
  | IntrospectionNamedTypeRef
  | IntrospectionListTypeRef
  | IntrospectionNonNullTypeRef<IntrospectionNamedTypeRef | IntrospectionListTypeRef>;

export type IntrospectionOutputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionOutputType>
  | IntrospectionListTypeRef<IntrospectionOutputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionOutputType>
      | IntrospectionListTypeRef<IntrospectionOutputTypeRef>
    >;

export type IntrospectionInputTypeRef =
  | IntrospectionNamedTypeRef<IntrospectionInputType>
  | IntrospectionListTypeRef<IntrospectionInputTypeRef>
  | IntrospectionNonNullTypeRef<
      | IntrospectionNamedTypeRef<IntrospectionInputType>
      | IntrospectionListTypeRef<IntrospectionInputTypeRef>
    >;

export interface IntrospectionNamedTypeRef<T extends IntrospectionType = IntrospectionType> {
  readonly kind: T['kind'];
  readonly name: string;
}

export interface IntrospectionField {
  readonly name: string;
  readonly description?: Maybe<string>;
  args: Array<IntrospectionInputValue>;
  readonly type: IntrospectionOutputTypeRef;
  readonly isDeprecated: boolean;
  readonly deprecationReason: Maybe<string>;
}

export interface IntrospectionInputValue {
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly type: IntrospectionInputTypeRef;
  readonly defaultValue: Maybe<string>;
  readonly isDeprecated?: boolean;
  readonly deprecationReason?: Maybe<string>;
}

export interface IntrospectionEnumValue {
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly isDeprecated: boolean;
  readonly deprecationReason: Maybe<string>;
}

export interface IntrospectionDirective {
  readonly name: string;
  readonly description?: Maybe<string>;
  readonly isRepeatable?: boolean;
  readonly locations: ReadonlyArray<DirectiveLocation>;
  readonly args: ReadonlyArray<IntrospectionInputValue>;
}

export type Maybe<T> = null | undefined | T;

export enum DirectiveLocation {
  /** Request Definitions */
  QUERY = 'QUERY',
  MUTATION = 'MUTATION',
  SUBSCRIPTION = 'SUBSCRIPTION',
  FIELD = 'FIELD',
  FRAGMENT_DEFINITION = 'FRAGMENT_DEFINITION',
  FRAGMENT_SPREAD = 'FRAGMENT_SPREAD',
  INLINE_FRAGMENT = 'INLINE_FRAGMENT',
  VARIABLE_DEFINITION = 'VARIABLE_DEFINITION',
  /** Type System Definitions */
  SCHEMA = 'SCHEMA',
  SCALAR = 'SCALAR',
  OBJECT = 'OBJECT',
  FIELD_DEFINITION = 'FIELD_DEFINITION',
  ARGUMENT_DEFINITION = 'ARGUMENT_DEFINITION',
  INTERFACE = 'INTERFACE',
  UNION = 'UNION',
  ENUM = 'ENUM',
  ENUM_VALUE = 'ENUM_VALUE',
  INPUT_OBJECT = 'INPUT_OBJECT',
  INPUT_FIELD_DEFINITION = 'INPUT_FIELD_DEFINITION',
}
