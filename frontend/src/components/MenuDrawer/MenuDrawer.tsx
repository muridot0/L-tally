import clsx from 'clsx';
import { useEffect, useState } from 'react';
import MenuGroup from '../MenuGroup/MenuGroup';
import QuoteOfTheDay from '../QuoteOfTheDay/QuoteOfTheDay';
import TallyFooter from '../TallyFooter/TallyFooter';
import styles from './MenuDrawer.module.css';
import { AuthService } from '../../services/auth-service';
import { User } from '../../contexts/login';

interface Props {
  openDrawer: boolean;
  quoteSupplier: string;
}


function MenuDrawer({ openDrawer, quoteSupplier }: Props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setUser(AuthService.getCurrentUser().user)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
  }

  return (
      <div
        className={clsx(
          { [styles.openedDrawer]: openDrawer },
          { [styles.closedDrawer]: !openDrawer }
        )}
      >
        <MenuGroup
        />
        <QuoteOfTheDay className={styles.quote} quote={quoteSupplier} />
        <TallyFooter userName={user?.username} userIcon='person' onClick={handleLogout} />
      </div>
  );
}

export default MenuDrawer;
