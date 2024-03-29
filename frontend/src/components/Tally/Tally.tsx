import clsx from 'clsx';
import styles from './Tally.module.css';
import { useState } from 'react';
import { TallyCard } from '../../models/tallyCard';
import { TallyService } from '../../services/tally-service';

interface Props {
  tally: TallyCard;
  onDelete: VoidFunction;
}

function Tally({ tally, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [tallyCard, setTallyCard] = useState(tally);

  const increaseTally = () => {
    setTallyCard((tallyCard) => {
      return {
        ...tallyCard,
        tallyNumber: tallyCard.tallyNumber + 1
      };
    });
    TallyService.patchTallyNumber(tallyCard._id, tallyCard.tallyNumber + 1)
  };

  const decreaseTally = () => {
    if (tallyCard.tallyNumber > 0) {
      setTallyCard((tallyCard) => {
        return {
          ...tallyCard,
          tallyNumber: tallyCard.tallyNumber - 1
        };
      });
      TallyService.patchTallyNumber(tallyCard._id, tallyCard.tallyNumber - 1).then(() => {

      })
    }
  };

  const handleChangeTallyName = (e: any, oldTally: TallyCard) => {
    setTallyCard(() => {
      if (!e.target.value) {
        return oldTally;
      }
      return {
        ...oldTally,
        tallyName: e.target.value
      };
    });
  };

  const handleChangeTallyNumber = (e: any, oldTally: TallyCard) => {
    setTallyCard(() => {
      if (e.target.value < 0) {
        return oldTally;
      }
      return {
        ...oldTally,
        tallyNumber: e.target.value
      };
    });
  };

  const confirmEdit = () => {
    TallyService.patchTally(tallyCard);
    setIsEditing(false);
  };

  let tallyContent;
  if (isEditing) {
    tallyContent = (
      <div className={clsx(styles.tallyCard)}>
        <div className={clsx(styles.input)}>
          <input
            type='text'
            className={styles.nameInputField}
            value={tallyCard.tallyName}
            onChange={(e) => handleChangeTallyName(e, tallyCard)}
            autoFocus
          />
        </div>
        <div className={clsx(styles.tallyContent)}>
          <input
            type='number'
            className={styles.numberInputField}
            value={tallyCard.tallyNumber}
            min='1'
            onChange={(e) => handleChangeTallyNumber(e, tallyCard)}
            autoFocus
          />
        </div>
        <div className={clsx(styles.editIcons)}>
          <span className={clsx('material-symbols-rounded', styles.delete)}
          onClick={() => {
            onDelete();
            setIsEditing(false)
          }}
          >
            delete_forever
          </span>
          <span
            className={clsx('material-symbols-rounded', styles.done)}
            onClick={confirmEdit}
          >
            done
          </span>
        </div>
      </div>
    );
  } else {
    tallyContent = (
      <div className={clsx(styles.tallyCard)}>
        <div className={clsx(styles.tallyHeader)}>
          <span className={clsx(styles.tallyName)}>{tallyCard.tallyName}</span>
          <span className={clsx('material-symbols-rounded', styles.editButton)} onClick={() => setIsEditing(true)}>more_vert</span>
        </div>
        <div className={clsx(styles.tallyContent)}>
          <span
            className={clsx('material-symbols-rounded', styles.subtractButton)}
            onClick={decreaseTally}
          >
            do_not_disturb_on
          </span>
          <span className={clsx(styles.tally)}>{tallyCard.tallyNumber}</span>
          <span
            className={clsx('material-symbols-rounded', styles.addButton)}
            onClick={() => {
              increaseTally()
            }}
          >
            add_circle
          </span>
        </div>
      </div>
    );
  }

  return <>{tallyContent}</>;
}

export default Tally;
