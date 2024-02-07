import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../../reducers/dataSlice'
import styles from './DeleteTask.module.scss'

const DeleteTask = ({ close, task, infoRoute }) => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const handleDeleteTask = () => {
    dispatch(deleteTask(infoRoute))
    close()
  }
  
  return (
    <div className={styles.modal} onClick={close}>
      <section className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Delete this task?</h2>
        <p className={styles.text}>Are you sure you want to delete the ‘{task.title}’ task and its subtasks? This action cannot be reversed.</p>
        <span className={styles.buttonContainer}>
          <button onClick={() => handleDeleteTask()} className={styles.buttonDelete}>Delete</button>
          <button onClick={close} className={`${styles.buttonClose} ${styles[theme]}`}>Cancel</button>          
        </span>

      </section>
    </div>
  )
}

export default DeleteTask