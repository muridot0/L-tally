import React from 'react';
import { useState } from 'react';
import MenuGroup from './components/MenuGroup/MenuGroup';
import { v4 as uuidv4 } from 'uuid'; 

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(String || null)

  return (
    <div>
      <MenuGroup 
        selectedItemId={activeMenuItem}
        onClick={(id) => setActiveMenuItem(id)}
        items={[
          {
            meta: '',
            spaceName: 'L-Kings',
            id: uuidv4()
          },
          {
            meta: '',
            spaceName: 'Participants',
            id: uuidv4()
          },
        ]} />
    </div>
  );
}

export default App;
