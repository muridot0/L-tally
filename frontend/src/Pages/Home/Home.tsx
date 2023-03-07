import { useState, useEffect, createContext } from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import TallyHeader from '../../components/TallyHeader/TallyHeader';
const Quotes = require('randomquote-api');

export const OpenContext = createContext({
  open: true,
});

export default function Home() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState(String);
  const [open, setOpen] = useState(true);
  const value = {open}

  useEffect(() => {
    const getObject = () => {
      let randomQuoteObject;
      randomQuoteObject = Quotes.randomQuote();
      setQuote(randomQuoteObject.quote + ' - ' + randomQuoteObject.author);
    }
    getObject();
    setInterval(() => {
      getObject();
    }, 86400 * 1000);
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    if(!loggedInUser){
      navigate('/login')
      window.location.reload();
    }
  })

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
