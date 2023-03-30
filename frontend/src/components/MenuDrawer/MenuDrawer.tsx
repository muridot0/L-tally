import clsx from 'clsx';
import { useContext } from 'react';
import MenuGroup from '../MenuGroup/MenuGroup';
import QuoteOfTheDay from '../QuoteOfTheDay/QuoteOfTheDay';
import TallyFooter from '../TallyFooter/TallyFooter';
import styles from './MenuDrawer.module.css';
import { LoginContext } from '../../contexts/login';
import { useNavigate } from 'react-router-dom';

interface Props {
  openDrawer: boolean;
  quoteSupplier: string;
}


function MenuDrawer({ openDrawer, quoteSupplier, }: Props) {
  const { userSpaces, user } = useContext(LoginContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.clear()
    navigate('/login')
  }

  if(!user){
    return <></>;
  }

  return (
      <div
        className={clsx(
          { [styles.openedDrawer]: openDrawer },
          { [styles.closedDrawer]: !openDrawer }
        )}
      >
        <div className={clsx(styles.spaceQuoteGroup)}>
          <MenuGroup spaces={userSpaces}
          />
          <QuoteOfTheDay className={styles.quote} quote={quoteSupplier} />
        </div>
        <div>
          <TallyFooter userName={user.username} userIcon={user.avatar} onClick={handleLogout} />
        </div>
      </div>
  );
}

export default MenuDrawer;
