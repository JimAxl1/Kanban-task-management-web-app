import React from 'react'
import styles from './CardTask.module.scss'
import InfoTask from '../InfoTask'
import EditTask from '../EditTask'
import DeleteTask from '../DeleteTask'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const CardTask = ({ task, infoRoute }) => {
  const theme = useSelector((state) => state.theme)
  const [showInfo, setShowInfo] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [showDeleteTask, setShowDeleteTask] = useState(false)

  var x = 0
  let taskCompleted = task.subtasks.map((item) => {
    if (item.isCompleted === true){
      return x = x + 1;
    }
  })

  return (
    <section className={`${styles.container} ${styles[theme]}`} onClick={() => setShowInfo(true)}>
      <p className={`${styles.title} ${styles[theme]}`}>{task.title}</p>
      <p className={styles.subtasks}>{x} of {task.subtasks.length} completed</p>
      {showInfo && <InfoTask task={task} subtasks={x} close={() => setShowInfo(false)} infoRoute={infoRoute} openEditTask={() => setShowEditTask(true)} openDeleteTask={() => setShowDeleteTask(true)}/>}
      {showEditTask && <EditTask close={() => setShowEditTask(false)} task={task} infoRoute={infoRoute} />}
      {showDeleteTask && <DeleteTask close={() => setShowDeleteTask(false)} task={task} infoRoute={infoRoute} />}
    </section>
  )
}

export default CardTask