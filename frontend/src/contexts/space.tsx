import React from 'react';

interface spaceContextType {
  activeMenuItem: string;
  setActiveMenuItem: (id: string) => void;
}

interface SpaceProviderProps extends React.PropsWithChildren {}

const SpaceContext = React.createContext<spaceContextType>({
  activeMenuItem: '',
  setActiveMenuItem: () => {
    throw new Error('Missing SpaceContext.Provider');
  }
});

function SpaceProvider({ children }: SpaceProviderProps) {
  const [activeMenuItem, setActiveMenuItem] = React.useState('');

  return (
    <SpaceContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
      {children}
    </SpaceContext.Provider>
  );
}

export { SpaceProvider, SpaceContext };
