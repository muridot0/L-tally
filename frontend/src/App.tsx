import { useState, useEffect, useCallback } from 'react';
import AddPerson from './components/AddPerson/AddPerson';
import TallyHeader from './components/TallyHeader/TallyHeader';
import MenuDrawer from './components/MenuDrawer/MenuDrawer';
const Quotes = require('randomquote-api');

function App() {
  const [quote, setQuote] = useState(String);
  const [open, setOpen] = useState(false);

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
    <TallyHeader
      menuDrawerOpened={open}
      onNavOpen={() => setOpen(true)}
      onNavClose={() => setOpen(false)}
    >
      <MenuDrawer openDrawer={open} quoteSupplier={quote} />
      <AddPerson tally={[]} openNav={open} />
    </TallyHeader>
  );
}

export default App;
