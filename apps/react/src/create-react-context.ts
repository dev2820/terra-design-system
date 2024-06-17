import {
  createContext as _createContext,
  useContext as _useContext,
} from 'react';

export type CreateContextOptions<T> = {
  strict?: boolean;
  hookName?: string;
  providerName?: string;
  errorMessage?: string;
  name?: string;
  defaultValue?: T;
};

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>,
];

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}

export function createReactContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    hookName = 'useContext',
    providerName = 'Provider',
    errorMessage,
    defaultValue,
  } = options;

  const Context = _createContext<T | undefined>(defaultValue);

  Context.displayName = name;

  function useContext() {
    const context = _useContext(Context);

    if (!context) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName),
      );
      error.name = 'ContextError';
      throw error;
    }

    return context;
  }

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}
