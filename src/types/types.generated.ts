export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DateTime: any;
};

/** category  */
export type Category = {
  __typename?: 'Category';
  creationAt: Scalars['DateTime'];
  id: Scalars['ID'];
  image: Scalars['String'];
  name: Scalars['String'];
  products: Array<Product>;
  updatedAt: Scalars['DateTime'];
};

export type CreateCategoryDto = {
  image: Scalars['String'];
  name: Scalars['String'];
};

export type CreateProductDto = {
  categoryId: Scalars['Float'];
  description: Scalars['String'];
  images: Array<Scalars['String']>;
  price: Scalars['Float'];
  title: Scalars['String'];
};

export type CreateUserDto = {
  avatar: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Role>;
};

/** Login  */
export type Login = {
  __typename?: 'Login';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addProduct: Product;
  addUser: User;
  deleteCategory: Scalars['Boolean'];
  deleteProduct: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: Login;
  refreshToken: Login;
  updateCategory: Category;
  updateProduct: Product;
  updateUser: User;
};

export type MutationAddCategoryArgs = {
  data: CreateCategoryDto;
};

export type MutationAddProductArgs = {
  data: CreateProductDto;
};

export type MutationAddUserArgs = {
  data: CreateUserDto;
};

export type MutationDeleteCategoryArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};

export type MutationUpdateCategoryArgs = {
  changes: UpdateCategoryDto;
  id: Scalars['ID'];
};

export type MutationUpdateProductArgs = {
  changes: UpdateProductDto;
  id: Scalars['ID'];
};

export type MutationUpdateUserArgs = {
  changes: UpdateUserDto;
  id: Scalars['ID'];
};

/** product  */
export type Product = {
  __typename?: 'Product';
  category: Category;
  creationAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  images: Array<Scalars['String']>;
  price: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  isAvailable: Scalars['Boolean'];
  myProfile: User;
  product: Product;
  products: Array<Product>;
  user: User;
  users: Array<User>;
};

export type QueryCategoryArgs = {
  id: Scalars['ID'];
};

export type QueryIsAvailableArgs = {
  email: Scalars['String'];
};

export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type QueryProductsArgs = {
  categoryId?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  price?: InputMaybe<Scalars['Int']>;
  price_max?: InputMaybe<Scalars['Int']>;
  price_min?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Float']>;
};

export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}

export type UpdateCategoryDto = {
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateProductDto = {
  categoryId?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  images?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['Float']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateUserDto = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};

/** product  */
export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  creationAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};
