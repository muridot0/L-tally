import clsx from 'clsx';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space-service';
import styles from './Menu.module.css';

export interface Props {
  item: Space;
  onClick: VoidFunction;
  onDelete: VoidFunction;
  spaceCards?: object;
}

function Menu({ item, onClick, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [cancelSpaceName, setCancelSpaceName] = useState(item.spaceName);
  const [editedSpaceName, setEditedSpaceName] = useState('')
  const [menuItem, setMenuItem] = useState(item)
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      SpaceService.patchSpace({...item, spaceName: editedSpaceName, route: `/${editedSpaceName}`})
      navigate(`/${editedSpaceName}`)
      setIsEditing(false);
      setShowIcons(false);
      setEditedSpaceName('')
    }
  };

  const confirmEdit = () => {
    SpaceService.patchSpace({...item, spaceName: editedSpaceName, route: `/${editedSpaceName}`})
    navigate(`/${editedSpaceName}`)
    setIsEditing(false);
    setShowIcons(false);
    setEditedSpaceName('')
  }

  const handleCancel = () => {
    menuItem.spaceName = cancelSpaceName;
  };

  const handleChangeItem = (e: any, oldItem: Space) => {
    setMenuItem(() => {
        setEditedSpaceName(e.target.value)
        return {
          ...oldItem,
          spaceName: e.target.value,
          route: `/${e.target.value}`
        }
      }
    );
  }

  let menuContent;
  if (isEditing) {
    menuContent = (
      <div className={clsx(styles.input)}>
        <span className={clsx('material-symbols-rounded', styles.icon)}>
          category
        </span>
        <input
          value={menuItem.spaceName}
          className={styles.inputField}
          type='text'
          onChange={(e) => handleChangeItem(e, menuItem)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <span
          className={clsx('material-symbols-rounded', styles.doneButton)}
          onClick={confirmEdit}
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
        <span className={clsx(styles.activeTitle)}>{menuItem.spaceName}</span>
        <span
          className={clsx('material-symbols-rounded', styles.editIcon)}
          onClick={() => {
            setIsEditing(true);
            setCancelSpaceName(menuItem.spaceName);
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
      <NavLink to={menuItem.route} className={styles.navStyle}>
        {({isActive}) => (
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
              {menuItem.spaceName}
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
        )}
      </NavLink>
      </>
    );
  }

  return <>{menuContent}</>;
}

export default Menu;
