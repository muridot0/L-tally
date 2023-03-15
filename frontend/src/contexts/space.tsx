import React from 'react';

interface spaceContextType {
  activeMenuItem: string;
  setActiveMenuItem: (id: string) => void;
  openDrawer: boolean;
  setOpenDrawer: (value: React.SetStateAction<boolean>) => void;
}

interface SpaceProviderProps extends React.PropsWithChildren {}

const SpaceContext = React.createContext<spaceContextType>({
  activeMenuItem: '',
  setActiveMenuItem: () => {
    throw new Error('Missing SpaceContext provider');
  },
  openDrawer: true,
  setOpenDrawer: () => {
    throw new Error('Missing SpaceContext provider')
  }
});

function SpaceProvider({ children }: SpaceProviderProps) {
  const [activeMenuItem, setActiveMenuItem] = React.useState('');
  const [openDrawer, setOpenDrawer] = React.useState(true)

  return (
    <SpaceContext.Provider value={{ activeMenuItem, setActiveMenuItem, openDrawer, setOpenDrawer }}>
      {children}
    </SpaceContext.Provider>
  );
}

export { SpaceProvider, SpaceContext };
