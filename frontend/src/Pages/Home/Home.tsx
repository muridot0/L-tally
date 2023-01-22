import { useState, useCallback, useEffect, createContext } from 'react';
import { Outlet  } from 'react-router-dom';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import TallyHeader from '../../components/TallyHeader/TallyHeader';
const Quotes = require('randomquote-api');

export const OpenContext = createContext({
  open: false,
});

export default function Home() {
  const [quote, setQuote] = useState(String);
  const [open, setOpen] = useState(false);
  const value = {open}



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
    <>
      <OpenContext.Provider value={value}>
        <TallyHeader
          menuDrawerOpened={open}
          onNavOpen={() => setOpen(true)}
          onNavClose={() => setOpen(false)}
        >
          <MenuDrawer openDrawer={open} quoteSupplier={quote} />
          <Outlet />
        </TallyHeader>
      </OpenContext.Provider>
    </>
  );
}
