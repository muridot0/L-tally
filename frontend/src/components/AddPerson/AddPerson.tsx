import clsx from 'clsx';
import Tally from '../Tally/Tally';
import styles from './AddPerson.module.css';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { SpaceContext } from '../../contexts/space';
import { TallyCard } from '../../models/tallyCard';
import { TallyService } from '../../services/tally-service';
interface Props {
  openNav?: boolean;
  spaceId: String | null;
  tallies: TallyCard[] | null;
}

function AddPerson({ openNav, spaceId, tallies }: Props) {
  const [tallyArr, setTallyArr] = useState<TallyCard[] | null>(null);
  const [person, setPerson] = useState(String);
  const [showInputTally, setShowInputTally] = useState(false);
  const { activeMenuItem } = useContext(SpaceContext);

  // useEffect(() => {
  //   const getData = async () => {
  //     setTallyArr(
  //       await TallyService.getTallyBySpaceId(activeMenuItem).then(
  //         (res: any) => {
  //           return res.data;
  //         }
  //       )
  //     );
  //   };
  //   getData();
  // }, [activeMenuItem]);
  useEffect(() => {
    setTallyArr(tallies)
  }, [tallies]);

  const handleAddPerson = async (name: string) => {
    if (!tallyArr) {
      return;
    }
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
        _id: uuidv4()
      }
    ];

    const blank = newArr.find((arr) => arr.tallyName.trim() === '');

    if (blank) {
      alert('Can not have blank tally names!');
      return;
    }

    await TallyService.createTally({
      tallyName: person,
      tallyNumber: 0,
      spaceId: activeMenuItem,
      _id: uuidv4()
    }).then(() => {
      setTallyArr(newArr);
    });
  };

  const showInput = () => {
    setPerson('');
    setShowInputTally(true);
  };

  const handleAddingTally = (e: any) => {
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

  const handleDelete = (id: string) => {
    if (!tallyArr) {
      return;
    }
    setTallyArr(() => {
      return tallyArr.filter(tally => {return tally._id !== id})
    });
    // setTallyArr(tallyArr.filter((tally) => {return tally._id !== id}));
    // TallyService.deleteTally(id).then(() => {
    //   // window.location.reload()
    // })
  };

  function dummyTally() {
    return (
      <div className={clsx(styles.tallyCard)}>
        <input
          className={clsx(styles.tallyHeader)}
          onChange={handleAddingTally}
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
      <div className={clsx(styles.tallyContainer)}>
        <div className={clsx(styles.tallyGroup)}>
          {tallyArr?.map((tallyItem, index) => {
            if (spaceId === tallyItem.spaceId) {
              return (
                <Tally
                  tally={tallyItem}
                  key={index}
                  onDelete={() => handleDelete(tallyItem._id)}
                />
              );
            } else {
              return null;
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
    </div>
  );
}

export default AddPerson;
