import { useState, useEffect } from 'react';
import MenuGroup from './components/MenuGroup/MenuGroup';
import { v4 as uuidv4 } from 'uuid';
import QuoteOfTheDay from './components/QuoteOfTheDay/QuoteOfTheDay';

const Quotes = require('randomquote-api');

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState(String || null);
  const [quote, setQuote] = useState(String);
  
  
  
  useEffect(() => {
    let randomQuoteObject;

    const getObject = () => {
      randomQuoteObject = Quotes.randomQuote();
      setQuote(randomQuoteObject.quote + ' - ' + randomQuoteObject.author)
    }

    getObject();

    const interval = setInterval(() => {
      getObject();
    }, 86400*1000);
    return () => clearInterval(interval);

  }, [])

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
      <QuoteOfTheDay>{quote}</QuoteOfTheDay>
    </div>
  );
}

export default App;
