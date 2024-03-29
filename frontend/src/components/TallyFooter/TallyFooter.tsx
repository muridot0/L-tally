import clsx from 'clsx';
import styles from './TallyFooter.module.css';

interface Props {
  userName: string;
  userIcon: string;
  onClick: VoidFunction;
}

function TallyFooter({ userName, userIcon, onClick }: Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <img src={userIcon} alt="Avatar" className={styles.avatar}/>
        <p>{userName}</p>
      </div>
      <div className={clsx(styles.content, styles.logout)} onClick={onClick}>
        <span className={clsx('material-symbols-rounded', styles.logoutButton)}>logout</span>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default TallyFooter;
