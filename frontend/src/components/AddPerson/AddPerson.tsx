import clsx from 'clsx';
import { tally } from '../Tally/types/tally';
import Tally from '../Tally/Tally';
import styles from './AddPerson.module.css';
import { useState } from 'react';

interface Props {
  tally: tally[];
}

function AddPerson({ tally }: Props) {
  const [tallyArr, setTallyArr] = useState(tally);
  const [person, setPerson] = useState(String);

  const handleAddPerson = () => {
    let newArr = [
      ...tallyArr,
      {
        person: 'chale',
        tally: 2,
      },
    ];

    setTallyArr(newArr)
  };

  return (
    <div>
      <span
        className={clsx('material-symbols-rounded', styles.addPerson)}
        onClick={handleAddPerson}
      >
        person_add
      </span>
      {tallyArr.map((tallyItems, index) => {
        return (
          <Tally tally={tallyItems}/>
        )
      })}
    </div>
  );
}

export default AddPerson;
