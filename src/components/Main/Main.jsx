import React from 'react'
import { useState } from 'react'
import CardTask from '../CardTask'
import EditBoard from '../EditBoard'
import { useSelector } from 'react-redux'
import styles from './Main.module.scss'

const Main = ({ sideBarActive }) => {
  const [showEditBoard, setShowEditBoard] = useState(false)
  const indexBoard = useSelector((state) => state.board)
  const allBoards = useSelector((state) => state.data)
  const theme = useSelector((state) => state.theme)
  const board = allBoards[indexBoard]

  return (
    board.columns.length > 0 ?
      <main className={`${styles.main} ${styles[theme]} ${sideBarActive && styles.moveLeft}`}>
        {board.columns.map((column, indexColumn) => {
          return (
            <article className={styles.column} key={indexColumn}>
              <p className={styles.text}>{column.name} ({column.tasks.length})</p>
              {column.tasks.map((item, indexTask) => {
                let infoRoute = {indexBoard: indexBoard, indexColumn: indexColumn, indexTask: indexTask}
                return <CardTask key={indexTask} task={item} infoRoute={infoRoute} />
              })}
            </article>
          )
        })}
        <button className={`${styles.createColumn} ${styles[theme]}`} onClick={() => setShowEditBoard(true)}>
          +New column
        </button>
        {showEditBoard && <EditBoard close={() => setShowEditBoard(false)}/>}
      </main>
      :
      <main className={`${styles.boardEmpty} ${styles[theme]} ${sideBarActive && styles.moveLeft}`}>
        <p className={styles.text}>This board is empty. Create a new column to get started.</p>
        <button className={styles.button} onClick={() => setShowEditBoard(true)}>+ Add New Column</button>
        {showEditBoard && <EditBoard close={() => setShowEditBoard(false)}/>}
      </main>
  )
}

export default Main