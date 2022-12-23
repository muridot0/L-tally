import styles from './QuoteOfTheDay.module.css';

interface Props {
  children?: string;
}

function QuoteOfTheDay({ children }: Props) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Quote of The Day</h2>
      <p className={styles.tip}>{children}</p>
    </div>
  );
}

export default QuoteOfTheDay;
