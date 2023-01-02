import clsx from 'clsx';
import styles from './TallyFooter.module.css';

interface Props {
  userName: string;
  userIcon: string;
}

function TallyFooter({ userName, userIcon }: Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <span className={clsx('material-symbols-rounded')}>{userIcon}</span>
        <p>{userName}</p>
      </div>
      <div className={styles.content}>
        <span className={clsx('material-symbols-rounded')}>logout</span>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default TallyFooter;
