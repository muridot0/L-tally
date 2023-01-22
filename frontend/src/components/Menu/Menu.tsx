import clsx from 'clsx';
import { useState } from 'react';
import styles from './Menu.module.css';
import { item } from './types/items';

export interface Props {
  item: item;
  isActive?: boolean;
  onClick: VoidFunction;
  onChange: Function;
  onDelete: VoidFunction;
  spaceCards?: object;
}

function Menu({ item, onClick, isActive, onChange, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [cancelSpaceName, setCancelSpaceName] = useState(item.spaceName);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      setShowIcons(false);
    }
  };

  const handleCancel = () => {
    item.spaceName = cancelSpaceName;
  };

  let menuContent;
  if (isEditing) {
    menuContent = (
      <div className={clsx(styles.input)}>
        <span className={clsx('material-symbols-rounded', styles.icon)}>
          category
        </span>
        <input
          value={item.spaceName}
          className={styles.inputField}
          type='text'
          onChange={(e) => onChange(e)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <span
          className={clsx('material-symbols-rounded', styles.doneButton)}
          onClick={() => {
            setIsEditing(false);
            setShowIcons(false);
          }}
        >
          done
        </span>
        <span
          className={clsx('material-symbols-rounded', styles.closeButton)}
          onClick={() => {
            handleCancel();
            setIsEditing(false);
            setShowIcons(false);
          }}
        >
          close
        </span>
      </div>
    );
  } else if (showIcons) {
    menuContent = (
      <div id='menu' className={clsx(styles.menuItem, styles.activeItem)}>
        <span className={clsx('material-symbols-rounded', styles.icon)}>
          category
        </span>
        <span className={clsx(styles.activeTitle)}>{item.spaceName}</span>
        <span
          className={clsx('material-symbols-rounded', styles.editIcon)}
          onClick={() => {
            setIsEditing(true);
            setCancelSpaceName(item.spaceName);
          }}
        >
          edit
        </span>
        {}
        <span
          className={clsx('material-symbols-rounded', styles.deleteIcon)}
          onClick={() => {
            onDelete();
            setIsEditing(false);
            setShowIcons(false);
          }}
        >
          delete_forever
        </span>
      </div>
    );
  } else {
    menuContent = (
      <>
        <div
          id='menu'
          className={clsx(styles.menuItem, {
            [styles.activeItem]: isActive,
          })}
          onClick={onClick}
        >
          <span className={clsx('material-symbols-rounded', styles.icon)}>
            category
          </span>
          <span className={clsx({ [styles.activeTitle]: isActive })}>
            {item.spaceName}
          </span>
          {isActive ? (
            <span
              className={clsx('material-symbols-rounded', styles.moreIcon)}
              onClick={() => setShowIcons(true)}
            >
              more_vert
            </span>
          ) : null}
        </div>
      </>
    );
  }

  return <>{menuContent}</>;
}

export default Menu;
