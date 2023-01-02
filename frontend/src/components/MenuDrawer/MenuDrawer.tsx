import MenuGroup from '../MenuGroup/MenuGroup';
import QuoteOfTheDay from '../QuoteOfTheDay/QuoteOfTheDay';
import clsx from 'clsx';
import styles from './MenuDrawer.module.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  quote: string;
}

function MenuDrawer({ quote }: Props) {
  const [activeMenuItem, setActiveMenuItem] = useState(String || null);
  const [open, setOpen] = useState(true);

  const openCloseMenu = () => {
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className={styles.menuDrawer}>
      <div className={styles.logo}>
        <span className={clsx('material-symbols-rounded', styles.icon)}>
          scoreboard
        </span>
        <div>
          <p className={styles.headerTop}>L-Tally</p>
          <p className={styles.headerBottom}>Keeping score ...</p>
        </div>
        <div className={styles.burger}>
          {!open ? (
            <span
              className={clsx('material-symbols-rounded', styles.close)}
              onClick={openCloseMenu}
            >
              close
            </span>
          ) : (
            <span
              className={clsx('material-symbols-rounded', styles.menu)}
              onClick={openCloseMenu}
            >
              menu
            </span>
          )}
        </div>
      </div>
      <div className={clsx({[styles.menuGroup] : !open}, {[styles.closeWidth] : open} )}>
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
      </div>
    </div>
  );
}

export default MenuDrawer;
