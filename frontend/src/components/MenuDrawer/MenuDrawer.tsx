import clsx from "clsx";
import { useState } from "react";
import MenuGroup from "../MenuGroup/MenuGroup";
import QuoteOfTheDay from "../QuoteOfTheDay/QuoteOfTheDay";
import TallyFooter from "../TallyFooter/TallyFooter";
import styles from "./MenuDrawer.module.css"
import { v4 as uuidv4 } from "uuid";

interface Props{
  openDrawer: boolean;
  quoteSupplier: string;
}

const defaultMenu = [
  {
    meta: '',
    spaceName: 'L-Tally',
    id: uuidv4(),
    route: '/L-Tally',
  },
];


function MenuDrawer({ openDrawer, quoteSupplier }: Props) {
  const [activeMenuItem, setActiveMenuItem] = useState(defaultMenu[0].id || null);



  return (
    <div className={clsx({[styles.openedDrawer]: openDrawer}, {[styles.closedDrawer]: !openDrawer})}>
      <MenuGroup
          items={defaultMenu}
          selectedItemId={activeMenuItem}
          onClick={(id) => setActiveMenuItem(id)}
        />
        <QuoteOfTheDay className={styles.quote} quote={quoteSupplier} />
        <TallyFooter userName='Muri' userIcon='person' onClick={() => {}} />
    </div>
  )
}

export default MenuDrawer;