import { useState, useEffect, useCallback } from 'react';
import MenuGroup from './components/MenuGroup/MenuGroup';
import QuoteOfTheDay from './components/QuoteOfTheDay/QuoteOfTheDay';
import { v4 as uuidv4 } from 'uuid';
import AddPerson from './components/AddPerson/AddPerson';

const Quotes = require('randomquote-api');

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(String || null);
  const [quote, setQuote] = useState(String);

  
  
  const getObject = useCallback(() => {
    let randomQuoteObject;
    randomQuoteObject = Quotes.randomQuote();
    setQuote(randomQuoteObject.quote + ' - ' + randomQuoteObject.author);
  }, []);

  
  useEffect(() => {
    getObject();

    setInterval(() => {
      getObject();
    }, 86400 * 1000);
  }, [getObject]);

  return (
    <div>
      <MenuGroup
        selectedItemId={activeMenuItem}
        onClick={(id) => setActiveMenuItem(id)}
        items={[
          {
            meta: '',
            spaceName: 'L-Kings',
            id: uuidv4(),
          },
          {
            meta: '',
            spaceName: 'Participants',
            id: uuidv4(),
          },
        ]}
      />
      <br />
      <QuoteOfTheDay>{quote}</QuoteOfTheDay>
      <br />
      <AddPerson tally={[]}/>
    </div>
  );
}

export default App;
