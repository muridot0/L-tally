import React from 'react';

type User = {
  email: string;
  password: string;
  username: string;
  avatar?: string;
};

interface loginContextType {
  user: User | null;
  setUser: (user: User) => void;
}

export { type User };
export const LoginContext = React.createContext<loginContextType>({
  user: { username: '', email: '', password: '' },
  setUser: () => {
    throw new Error('Missing SpaceContext.Provider');
  }
});
