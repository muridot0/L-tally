import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import MenuGroup from '../MenuGroup/MenuGroup';
import QuoteOfTheDay from '../QuoteOfTheDay/QuoteOfTheDay';
import TallyFooter from '../TallyFooter/TallyFooter';
import styles from './MenuDrawer.module.css';
import { v4 as uuidv4 } from 'uuid';
import { SpaceContext } from '../../contexts/space';
import { AuthService } from '../../services/auth-service';
import { User } from '../../contexts/login';

interface Props {
  openDrawer: boolean;
  quoteSupplier: string;
}

const defaultMenu = [
  {
    meta: '',
    spaceName: 'L-Tally',
    id: uuidv4(),
    route: `/L-Tally`,
    tally: [],
  },
];

function MenuDrawer({ openDrawer, quoteSupplier }: Props) {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<User | null>(null)
  const {activeMenuItem, setActiveMenuItem} = useContext(SpaceContext)

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
          items={defaultMenu}
          selectedItemId={activeMenuItem}
          onClick={(id) => setActiveMenuItem(id)}
        />
        <QuoteOfTheDay className={styles.quote} quote={quoteSupplier} />
        <TallyFooter userName={user?.username} userIcon='person' onClick={handleLogout} />
      </div>
  );
}

export default MenuDrawer;
