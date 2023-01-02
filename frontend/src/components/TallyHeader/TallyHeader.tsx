import clsx from 'clsx'
import styles from './TallyHeader.module.css'

interface Props {
  menuDrawerOpened: boolean;
  onClick: VoidFunction;
}

function TallyHeader({ menuDrawerOpened, onClick }: Props) {
  return (
    <div className={styles.logo}>
      <span className={clsx('material-symbols-rounded', styles.icon)}>
        scoreboard
      </span>
      <div>
        <p className={styles.headerTop}>L-Tally</p>
        <p className={styles.headerBottom}>Keeping score ...</p>
      </div>
      <div className={styles.burger}>
        {!menuDrawerOpened ? (
          <span
            className={clsx('material-symbols-rounded', styles.close)}
            onClick={onClick}
          >
            close
          </span>
        ) : (
          <span
            className={clsx('material-symbols-rounded', styles.menu)}
            onClick={onClick}
          >
            menu
          </span>
        )}
      </div>
    </div>
  );
}

export default TallyHeader;
