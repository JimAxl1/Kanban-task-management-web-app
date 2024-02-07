import React from 'react'
import styles from './Aside.module.scss'
import Theme from '../Theme'
import AddBoard from '../AddBoard'
import SvgComponent from '../SvgComponent'
import ChangeBoard from '../ChangeBoard'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeBoard } from '../../reducers/boardSlice'

const Aside = ({ close, parent }) => {
  const [showCard, setShowCard] = useState(false)
  const data = useSelector((state) => state.data);
  const theme = useSelector((state) => state.theme)
  const board = useSelector((state) => state.board)
  const dispatch = useDispatch();

  const handleChangeBoard = (itemIndex) => {
    dispatch(changeBoard(itemIndex))
  }

  return (
    <div className={`${styles.modal} ${styles[parent]}`} onClick={close}>
      <aside className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <img src={theme === 'light' ? '/assets/logo-dark.svg' : '/assets/logo-light.svg'} alt="" className={styles.logo} />
        <p className={styles.title}>ALL BOARDS ({data.length})</p>
        <ul className={styles.listContainer}>
          {data.map((item, index) => {
            let x = index === board ? true : false
            return <ChangeBoard key={index} name={item.name} handleFunction={() => handleChangeBoard(index)} close={close} selected={x} theme={theme} />
          })}
          <li className={`${styles.boards} ${styles[theme]}`}>
            <button onClick={() => setShowCard(true)} className={`${styles.button} ${styles.createButton}`}>
              <SvgComponent path='/assets/icon-board.svg' color='purple' colorHover='white' container='aside' />
              + Create New Board
            </button>  
          </li>
        </ul>
        {showCard && <AddBoard close={() => setShowCard(false)}/>}
        <Theme />
        <button className={`${styles.hide} ${styles[theme]}`} onClick={close}>
          <img src="/assets/icon-hide-sidebar.svg" alt="" />
          Hide Sidebar
        </button>
      </aside>
    </div>
  )
}

export default Aside