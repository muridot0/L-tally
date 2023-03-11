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
import { LoginContext } from '../../contexts/login';

interface Props {
  spaces: Space[] | null
}

function MenuGroup({spaces}: Props) {
  const { activeMenuItem, setActiveMenuItem } = useContext(SpaceContext)
  const {user} = useContext(LoginContext)
  const [menuItems, setMenuItems] = useState<Space[] | null>(spaces);
  const [spaceName, setSpaceName] = useState(String);
  const [activeInput, setActiveInput] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setMenuItems(spaces)
  },[spaces])

  useEffect(() => {
    const activeId = window.localStorage.getItem('activeMenuItem');

    if(!activeId){
      return;
    }
    setActiveMenuItem(activeId)
  },[setActiveMenuItem])

  useEffect(() => {
    window.localStorage.setItem('activeMenuItem', activeMenuItem)
  }, [activeMenuItem])


  async function addMenuItems(name: string) {
    if(!user){
      return;
    }
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
        userId: user._id,
        meta: '',
        spaceName: spaceName,
        _id: id,
        route: `/${spaceName}`,
      },
    ];

    await SpaceService.createSpace({
      userId: user._id,
      _id: id,
      meta: '',
      spaceName: spaceName,
      route: `/${spaceName}`,
    }).then(() => {
      setMenuItems(newArr.filter((arr) => arr.spaceName.trim() !== ''));
      setActiveMenuItem(id)
      navigate(`/${spaceName}`)
      SpaceService.getSpacesByUserId(user._id)
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
    if(!user){
      return
    }
    SpaceService.deleteSpace(id).then(() =>{
      setMenuItems(menuItems.filter((menuItem) => menuItem._id !== id))
      SpaceService.getSpacesByUserId(user._id).then(() => {
        const spaces = window.localStorage.getItem("spaces")

        if(!spaces){
          return;
        }
        const parsedSpaces = JSON.parse(spaces).data
        if(!parsedSpaces.length){
          navigate('/')
          setActiveMenuItem('')
          return;
        }
        navigate(`${parsedSpaces[0]['route']}`)
        setActiveMenuItem(parsedSpaces[0]['_id'])
      })
    })

  };

  let noMenuItems
  noMenuItems = (
    <div className={clsx(styles.card)}>
      <p className={styles.tip}>Click on the "➕" button above to create a space</p>
    </div>
  )

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
            {!menuItems?.length ? noMenuItems: menuItems.map((menuItem) => {
                return (
                    <Menu
                      key={menuItem._id}
                      item={menuItem}
                      onDelete={() => {
                        handleDeleteItem(menuItem._id);
                      }}
                      onClick={() => setActiveMenuItem(menuItem._id)}
                    />
                );
              }) }
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
