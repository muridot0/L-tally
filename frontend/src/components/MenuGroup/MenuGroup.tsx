import React from 'react';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import { item } from '../Menu/types/items';
import clsx from 'clsx';
import styles from './MenuGroup.module.css';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export interface Props {
  items: item[];
  selectedItemId: string | null;
  onClick: (id: string) => void;
}

function MenuGroup({ items, selectedItemId, onClick }: Props) {
  const [menuItems, setMenuItems] = useState(items);
  const [spaceName, setSpaceName] = useState(String);
  const [activeInput, setActiveInput] = useState(false);


  function addMenuItems(name: string) {
    const exists = menuItems.find((item) => item.spaceName === name);
    if (exists) {
      alert('Can not create space name with a name that already exists');
      return;
    }
    setActiveInput(true);
    let newArr = [
      ...menuItems,
      {
        meta: '',
        spaceName: spaceName,
        id: uuidv4(),
        route: `/${spaceName}`,
        tally: [],
      },
    ];
    setMenuItems(newArr.filter((arr) => arr.spaceName.trim() !== ''));
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    setSpaceName(e.target.value);
  };

  const confirmAdd = () => {
    addMenuItems(spaceName);
    setActiveInput(false);
    setSpaceName('');
  };

  const closeInput = () => {
    setActiveInput(false);
    setSpaceName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMenuItems(spaceName);
      setActiveInput(false);
      setSpaceName('');
    }
  };

  const showInput = () => {
    setActiveInput(!activeInput);
    setSpaceName('');
  };

  const handleChangeItem = (e: any, item: item) => {
    setMenuItems(
      menuItems.map((menuItem) => {
        if (menuItem.spaceName !== item.spaceName) {
          return menuItem;
        } else {
          return {
            ...menuItem,
            spaceName: e.target.value,
          };
        }
      })
    );
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((menuItem) => menuItem.spaceName !== id));
  };

  return (
        <div>
          <div className={styles.menuHeader}>
            <p>Spaces</p>
            <span
              className={clsx('material-symbols-rounded', styles.addButton)}
              onClick={showInput}
            >
              add
            </span>
          </div>
          <div className={styles.menuItemGroup}>
            {menuItems.map((menuItem, index) => {
              return (
                <>
                  <Link to={menuItem.route} className={styles.navStyle}>
                    <Menu
                      key={index}
                      item={menuItem}
                      isActive={menuItem.id === selectedItemId}
                      onClick={() => onClick(menuItem.id)}
                      onChange={(e: any) => {
                        handleChangeItem(e, menuItem);
                      }}
                      onDelete={() => {
                        handleDeleteItem(menuItem.spaceName);
                      }}
                    />
                  </Link>
                </>
              );
            })}
          </div>
          {activeInput ? (
            <div className={clsx(styles.input)}>
              <span className={clsx('material-symbols-rounded', styles.icon)}>
                category
              </span>
              <input
                className={styles.inputField}
                type='text'
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <span
                className={clsx('material-symbols-rounded', styles.doneButton)}
                onClick={confirmAdd}
              >
                done
              </span>
              <span
                className={clsx('material-symbols-rounded', styles.closeButton)}
                onClick={closeInput}
              >
                close
              </span>
            </div>
          ) : null}
          <hr className={styles.divider} />
        </div>
  );
}

export default MenuGroup;
