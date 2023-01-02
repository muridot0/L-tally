import clsx from 'clsx';
import { useState, useEffect, useCallback } from 'react';
import AddPerson from './components/AddPerson/AddPerson';
import MenuGroup from './components/MenuGroup/MenuGroup';
import QuoteOfTheDay from './components/QuoteOfTheDay/QuoteOfTheDay';
import styles from './App.module.css';
import { v4 as uuidv4 } from 'uuid';
import TallyHeader from './components/TallyHeader/TallyHeader';
import TallyFooter from './components/TallyFooter/TallyFooter';
const Quotes = require('randomquote-api');

function App() {
  const [quote, setQuote] = useState(String);
  const [activeMenuItem, setActiveMenuItem] = useState(String || null);
  const [open, setOpen] = useState(true);

  const openCloseMenu = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

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
      <TallyHeader menuDrawerOpened={open} onClick={openCloseMenu} />
      <div
        className={clsx(
          { [styles.menuGroup]: !open },
          { [styles.closeWidth]: open }
        )}
      >
        <MenuGroup
          items={[
            {
              meta: '',
              spaceName: 'L-Kings',
              id: uuidv4(),
              route: '/L-Kings',
            },
            {
              meta: '',
              spaceName: 'Participants',
              id: uuidv4(),
              route: '/Participants',
            },
          ]}
          selectedItemId={activeMenuItem}
          onClick={(id) => setActiveMenuItem(id)}
        />
        <QuoteOfTheDay className={styles.quote}>{quote}</QuoteOfTheDay>
        <TallyFooter userName='Muri' userIcon='person' onClick={() => {}} />
      </div>
      <div className={clsx({ [styles.openDrawer]: !open })}>
        <AddPerson tally={[]} />
      </div>
    </div>
  );
}

export default App;
