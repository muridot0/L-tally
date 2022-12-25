import { tally } from './types/tally';
import clsx from 'clsx';
import styles from './Tally.module.css';
import { useState } from 'react';

interface Props {
  tally: tally;
}

function Tally({ tally }: Props) {
  const [count, setCount] = useState(tally.tallyNumber);

  const increaseTally = () => {
    setCount(count => count + 1);
  };

  const decreaseTally = () => {
    if (count > 0) {
      setCount(count => count - 1);
    }
  };

  return (
    <div className={clsx(styles.tallyCard)}>
      <span className={clsx(styles.tallyHeader)}>{tally.tallyName}</span>
      <div className={clsx(styles.tallyContent)}>
        <span
          className={clsx('material-symbols-rounded', styles.subtractButton)}
          onClick={decreaseTally}
        >
          do_not_disturb_on
        </span>
        <span className={clsx(styles.tally)}>{count}</span>
        <span
          className={clsx('material-symbols-rounded', styles.addButton)}
          onClick={increaseTally}
        >
          add_circle
        </span>
      </div>
    </div>
  );
}

export default Tally;
