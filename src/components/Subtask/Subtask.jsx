import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeSubTask } from '../../reducers/dataSlice'
import styles from './Subtask.module.scss'

const Subtask = ({ isCompleted, text, infoRoute, index }) => {
  const theme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const info = {...infoRoute, indexSubtask: index, isCompleted: !isCompleted}
  
  return (
    <div className={`${styles.container} ${styles[theme]}`} onClick={() => dispatch(changeSubTask(info))}>
      <div className={styles.containerCheckBox}>
        <input type="checkbox" id={`subtask[${index}]`} checked={isCompleted} readOnly={true} className={`${styles.checkBox} ${styles[theme]}`} />
      </div>
      <label className={`${styles.text} ${styles[theme]} ${isCompleted && styles.completed}`}>{text}</label>
    </div>
  )
}

export default Subtask