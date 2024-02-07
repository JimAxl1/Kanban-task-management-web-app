import React from 'react'
import styles from './Header.module.scss'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import AddTask from '../AddTask'
import DeleteBoard from '../DeleteBoard'
import EditBoard from '../EditBoard'
import Aside from '../Aside'
import "@fontsource/plus-jakarta-sans";

const Header = ({ sideBarActive }) => {
  const [showCard, setShowCard] = useState(false)
  const [showDropMenu, setShowDropMenu] = useState(false)
  const [showDeleteBoard, setShowDeleteBoard] = useState(false)
  const [showEditBoard, setShowEditBoard] = useState(false)
  const [showAside, setShowAside] = useState(false)

  const catMenu = useRef(null)

  const closeOpenMenus = (e)=>{
    if(showDropMenu && !catMenu.current?.contains(e.target)){
      setShowDropMenu(false)
    }
  }

  document.addEventListener('mousedown',closeOpenMenus)

  const theme = useSelector((state) => state.theme);
  const indexBoard = useSelector((state) => state.board);
  const allBoards = useSelector((state) => state.data);
  
  var disabled = false;
  if (indexBoard === null || allBoards[indexBoard].columns.length === 0){
    disabled = true
  }else{
    disabled = false
  }
  
  const openEditBoard = () => {
    setShowEditBoard(true)
    setShowDropMenu(false)
  }

  const openDeleteBoard = () => {
    setShowDeleteBoard(true)
    setShowDropMenu(false)
  }

  return (
    <header className={`${styles.container} ${styles[theme]} ${sideBarActive && styles.moveRight}`}>
      <span className={styles.container_Title} onClick={() => setShowAside(true)}>
        <picture className={`${styles.logo} ${styles[theme]}`}>
          <source media="(min-width: 768px)" srcSet={theme === "light" ? "/assets/logo-dark.svg" : "/assets/logo-light.svg"} />
          <img src="/assets/logo-mobile.svg" alt="logo" />
        </picture>
        <h1 className={`${styles.title} ${styles[theme]}`}> {indexBoard !== null ? allBoards[indexBoard].name : 'No boards'} </h1>    
        <img className={styles.chevron} src={showAside ? "/assets/icon-chevron-up.svg" : "/assets/icon-chevron-down.svg"} alt="" /> 
      </span>
      <span className={styles.containerButtons}>
        <button onClick={() => setShowCard(true)} className={styles.button1} disabled={disabled}>
          <img src="/assets/icon-add-task-mobile.svg" alt="" />
        </button>
        <button onClick={() => setShowDropMenu(!showDropMenu)} className={styles.button2}>
          <img src="/assets/icon-vertical-ellipsis.svg" alt="" />
        </button>  
        {showDropMenu &&
          <div className={`${styles.dropMenu} ${styles[theme]}`} ref={catMenu}>
            <span onClick={() => openEditBoard()} className={styles.text}>Edit Board</span>
            <span onClick={() => openDeleteBoard()} className={`${styles.text} ${styles.delete}`}>Delete Board</span>
          </div>
        }
        {showDropMenu && indexBoard === null &&
          <div className={`${styles.dropMenu} ${styles[theme]}`} ref={catMenu}>
            <p className={styles.text}>You don't have boards to edit or delete</p>
          </div>
        }      
      </span>
      {showCard && <AddTask close={() => setShowCard(false)} />}
      {showDeleteBoard && <DeleteBoard close={() => setShowDeleteBoard(false)} />}
      {showEditBoard && <EditBoard close={() => setShowEditBoard(false)} />}
      {showAside && <Aside close={() => setShowAside(false)} parent={'header'} />}
    </header>
  )
}

export default Header