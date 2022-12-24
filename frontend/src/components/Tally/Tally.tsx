import { tally } from './types/tally';
import clsx from 'clsx';
import styles from './Tally.module.css';
import { useState } from 'react';

interface Props {
  tally: tally;
}

function Tally({ tally }: Props) {
  const [count, setCount] = useState(tally.tally);

  const increaseTally = () => {
    let counter = count;
    counter++;
    setCount(counter);
  };

  const decreaseTally = () => {
    let counter = count;
    if (counter > 0) {
      counter--;
    }
    setCount(counter);
  };

  return (
    <div className={clsx(styles.tallyCard)}>
      <span className={clsx(styles.tallyHeader)}>{tally.person}</span>
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
