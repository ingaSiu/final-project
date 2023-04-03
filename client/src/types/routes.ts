export type Route = {
  path: '/' | '/login' | 'register' | 'question';
  Component: () => JSX.Element;
};
