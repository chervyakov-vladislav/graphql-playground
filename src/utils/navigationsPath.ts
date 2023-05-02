type Paths = {
  id: number;
  title: 'Home' | 'Sign in' | 'GraphQL';
  path: '/' | '/auth' | '/graphql';
};

export const paths: Paths[] = [
  { id: 1, title: 'Home', path: '/' },
  { id: 2, title: 'Sign in', path: '/auth' },
  { id: 3, title: 'GraphQL', path: '/graphql' },
];
