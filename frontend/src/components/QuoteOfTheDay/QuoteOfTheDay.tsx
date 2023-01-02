import styles from './QuoteOfTheDay.module.css';
import clsx from 'clsx';

interface Props {
  children?: JSX.Element | string;
  className: string;
}

function QuoteOfTheDay({ children, className }: Props) {
  return (
    <div className={clsx(styles.card, className)}>
      <h2 className={styles.title}>Quote of The Day</h2>
      <p className={styles.tip}>{children}</p>
    </div>
  );
}

export default QuoteOfTheDay;
