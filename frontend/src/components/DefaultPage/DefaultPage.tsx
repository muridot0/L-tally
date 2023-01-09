import { useState, useCallback, useEffect } from "react";
import AddPerson from "../AddPerson/AddPerson";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import TallyHeader from "../TallyHeader/TallyHeader";
const Quotes = require('randomquote-api');



function DefaultPage() {
  const [quote, setQuote] = useState(String);
  const [open, setOpen] = useState(true);

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
  )
}

export default DefaultPage;

