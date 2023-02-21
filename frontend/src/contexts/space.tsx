import React from 'react';

interface spaceContextType {
  activeMenuItem: string;
  setActiveMenuItem: (id: string) => void;
}

export const SpaceContext = React.createContext<spaceContextType>({activeMenuItem: '', setActiveMenuItem: () => {throw new Error('Missing SpaceContext.Provider')}})
