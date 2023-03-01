import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import Menu from '../Menu/Menu';
import clsx from 'clsx';
import styles from './MenuGroup.module.css';
import { v4 as uuidv4 } from 'uuid';
import { SpaceService } from '../../services/space-service';
import { Space } from '../../models/space';
import { useNavigate } from 'react-router-dom';
import { SpaceContext } from '../../contexts/space';

interface Props {
  spaces: Space[] | null
}

function MenuGroup({spaces}: Props) {
  const { setActiveMenuItem } = useContext(SpaceContext)
  const [menuItems, setMenuItems] = useState<Space[] | null>(null);
  const [spaceName, setSpaceName] = useState(String);
  const [activeInput, setActiveInput] = useState(false);
  const navigate = useNavigate();


  const getUserId = () => {
    const loggedInUser = localStorage.getItem("user");
    if(!loggedInUser){
      throw new Error(`Cannot parse null of user`);
    }
    const parsedUser = JSON.parse(loggedInUser)
    return parsedUser.user._id
  }

  useEffect(() => {
    setMenuItems(spaces)
  },[spaces])

  async function addMenuItems(name: string) {
    if(!menuItems) {
      return ;
    }
    const exists = menuItems.find((item) => item.spaceName === name);
    if (exists) {
      alert('Can not create space name with a name that already exists');
      return;
    }
    setActiveInput(true);
    let id = uuidv4();
    let newArr = [
      ...menuItems,
      {
        userId: getUserId(),
        meta: '',
        spaceName: spaceName,
        _id: id,
        route: `/${spaceName}`,
      },
    ];

    await SpaceService.createSpace({
      userId: getUserId(),
      _id: id,
      meta: '',
      spaceName: spaceName,
      route: `/${spaceName}`,
    }).then(() => {
      setMenuItems(newArr.filter((arr) => arr.spaceName.trim() !== ''));
      setActiveMenuItem(id)
      navigate(`/${spaceName}`)
    })
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
      confirmAdd()
    }
  };

  const showInput = () => {
    setActiveInput(!activeInput);
    setSpaceName('');
  };

  const handleDeleteItem = (id: string) => {
    if(!menuItems) {
      return;
    }
    SpaceService.deleteSpace(id).then(() =>
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== id))
    )

    const spaces = localStorage.getItem("spaces")

    if(!spaces){
      return;
    }
    const parsedSpaces = JSON.parse(spaces).data
    navigate(`${parsedSpaces[0]['route']}`)
    setActiveMenuItem(parsedSpaces[0]['_id'])
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
            {menuItems?.map((menuItem, index) => {
              return (
                  <Menu
                    key={index}
                    item={menuItem}
                    onDelete={() => {
                      handleDeleteItem(menuItem._id);
                    }}
                    onClick={() => setActiveMenuItem(menuItem._id)}
                  />
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
