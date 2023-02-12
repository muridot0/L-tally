import React from 'react';

type User = {
  username: string;
  avatar?: string;
};

interface loginContextType {
  user: User | null;
  setUser: (user: User) => void;
  loggedIn: boolean;
  setLoggedIn: (id: boolean) => void;
}

export { type User };
export const LoginContext = React.createContext<loginContextType>({
  user: { username: '', avatar: ''},
  setUser: () => {
    throw new Error('Missing LoginContext.Provider');
  },
  loggedIn: false,
  setLoggedIn: () => {
    throw new Error('Missing LoginContext.Provider')
  }
});
