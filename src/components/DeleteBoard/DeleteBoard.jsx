import React from 'react'
import styles from './DeleteBoard.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBoard } from '../../reducers/dataSlice'
import { changeBoard } from '../../reducers/boardSlice'

const DeleteBoard = ({ close }) => {
  const theme = useSelector((state) => state.theme)
  const board = useSelector((state) => state.board)
  const allBoards = useSelector((state) => state.data)
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteBoard(board))
    if (allBoards.length !== 1){
      dispatch(changeBoard(0))
    }else{
      dispatch(changeBoard(null))
    }
    console.log(allBoards.length, allBoards)
    close()
  }

  return (
    <div className={styles.modal} onClick={close}>
      <section className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Delete this board?</h2>
        <p className={styles.text}>Are you sure you want to delete the ‘{allBoards[board].name}’ board? This action will remove all columns and tasks and cannot be reversed.</p>
        <span className={styles.buttonContainer}>
          <button onClick={() => handleDelete()} className={styles.buttonDelete}>Delete</button>
          <button onClick={close} className={`${styles.buttonClose} ${styles[theme]}`}>Cancel</button>          
        </span>
      </section>
    </div>
  )
}

export default DeleteBoard