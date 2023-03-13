import { useState, useEffect, createContext, useContext } from 'react';
import { Outlet, useNavigate, useParams  } from 'react-router-dom';
import MenuDrawer from '../../components/MenuDrawer/MenuDrawer';
import TallyHeader from '../../components/TallyHeader/TallyHeader';
import { SpaceContext } from '../../contexts/space';
const Quotes = require('randomquote-api');

export const OpenContext = createContext({
  open: true,
});

export default function Home() {
  const navigate = useNavigate()
  const [quote, setQuote] = useState(String);
  const [open, setOpen] = useState(true);
  const value = {open}

  const { setActiveMenuItem } = useContext(SpaceContext)

  const {id} = useParams()

  useEffect(() => {
    if(!id){
      return;
    }
    setActiveMenuItem(id)
  })

  useEffect(() => {
    const getObject = () => {
      let randomQuoteObject;
      randomQuoteObject = Quotes.randomQuote();
      setQuote(randomQuoteObject.quote + ' - ' + randomQuoteObject.author);
    }
    getObject();
    const interval = setInterval(() => {
      getObject();
    }, 86400 * 1000);
    return () => clearInterval(interval);
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
