import React from 'react'
import { useState } from 'react'
import AddBoard from '../AddBoard'
import styles from './NoBoard.module.scss'
import { useSelector } from 'react-redux/es/hooks/useSelector'

const NoBoards = ({ sideBarActive }) => {
  const [showAddBoard, setShowAddBoard] = useState(false)
  const theme = useSelector((state) => state.theme)

  return (
    <main className={`${styles.boardEmpty} ${styles[theme]} ${sideBarActive && styles.moveLeft}`}>
      <p className={styles.text}>You have no boards. Create a new board to get started.</p>
      <button className={styles.button} onClick={() => setShowAddBoard(true)}>+ Add New Board</button>
      {showAddBoard && <AddBoard close={() => setShowAddBoard(false)}/>}
   </main>
  )
}

export default NoBoards