import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import MenuGroup from '../MenuGroup/MenuGroup';
import QuoteOfTheDay from '../QuoteOfTheDay/QuoteOfTheDay';
import TallyFooter from '../TallyFooter/TallyFooter';
import styles from './MenuDrawer.module.css';
import { AuthService } from '../../services/auth-service';
import { LoginContext, User } from '../../contexts/login';
import { useNavigate } from 'react-router-dom';

interface Props {
  openDrawer: boolean;
  quoteSupplier: string;
}


function MenuDrawer({ openDrawer, quoteSupplier, }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const { userSpaces } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    setUser(AuthService.getCurrentUser().user)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
      <div
        className={clsx(
          { [styles.openedDrawer]: openDrawer },
          { [styles.closedDrawer]: !openDrawer }
        )}
      >
        <MenuGroup spaces={userSpaces}
        />
        <QuoteOfTheDay className={styles.quote} quote={quoteSupplier} />
        <TallyFooter userName={user?.username} userIcon='person' onClick={handleLogout} />
      </div>
  );
}

export default MenuDrawer;
