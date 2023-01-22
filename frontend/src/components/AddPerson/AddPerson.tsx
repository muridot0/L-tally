import clsx from 'clsx';
import { tally } from '../Tally/types/tally';
import Tally from '../Tally/Tally';
import styles from './AddPerson.module.css';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SpaceContext } from '../../contexts/space';
interface Props {
  tally: tally[];
  openNav?: boolean;
  spaceId: String | null;
}

function AddPerson({ tally, openNav, spaceId }: Props) {
  const [tallyArr, setTallyArr] = useState(tally);
  const [person, setPerson] = useState(String);
  const [showInputTally, setShowInputTally] = useState(false);

  const { activeMenuItem } = useContext(SpaceContext);


  const handleAddPerson = (name: string) => {
    const exists = tallyArr.find((tally) => tally.tallyName === name);
    if (exists) {
      alert('Tally name already exists!');
      return;
    }
    const newArr = [
      ...tallyArr,
      {
        tallyName: person,
        tallyNumber: 0,
        spaceId: activeMenuItem,
        id: uuidv4(),
      },
    ];

    const blank = newArr.find((arr) => arr.tallyName.trim() === '');

    if (blank) {
      alert('Can not have blank tally names!');
      return;
    }

    setTallyArr(newArr);
  };

  const showInput = () => {
    setPerson('');
    setShowInputTally(true);
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setPerson(e.target.value);
  };

  const confirmAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddPerson(person);
      setShowInputTally(false);
      setPerson('');
    }
  };

  const cancelAdd = () => {
    setShowInputTally(false);
    setPerson('');
  };

  function dummyTally() {
    return (
      <div className={clsx(styles.tallyCard)}>
        <input
          className={clsx(styles.tallyHeader)}
          onChange={handleChange}
          onKeyDown={confirmAdd}
          autoFocus
        />
        <div className={clsx(styles.tallyContent)}>
          <span
            className={clsx('material-symbols-rounded', styles.subtractButton)}
          >
            do_not_disturb_on
          </span>
          <span className={clsx(styles.tally)}>0</span>
          <span className={clsx('material-symbols-rounded', styles.addButton)}>
            add_circle
          </span>
        </div>
        <span
          className={clsx('material-symbols-rounded', styles.cancel)}
          onClick={cancelAdd}
        >
          close
        </span>
      </div>
    );
  }

  return (
    <div className={clsx({ [styles.openDrawer]: openNav })}>
      <div
        className={clsx(styles.tallyGroup)}
      >
        {tallyArr.map((tallyItems, index) => {
          if(spaceId === tallyItems.spaceId) {
            return <Tally tally={tallyItems} key={index} />;
          }else {
            return null
          }
        })}
        {showInputTally ? dummyTally() : null}
        <span
          className={clsx('material-symbols-rounded', styles.addPerson)}
          onClick={showInput}
        >
          person_add
        </span>
      </div>
    </div>
  );
}

export default AddPerson;
