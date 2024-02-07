import React from 'react'
import Subtask from '../Subtask'
import { useSelector, useDispatch } from 'react-redux'
import { changeStatusTask } from '../../reducers/dataSlice'
import { useState, useRef } from 'react'
import styles from './InfoTask.module.scss'

const InfoTask = ({ task, close, subtasks, infoRoute, openEditTask, openDeleteTask }) => {
  const [showDropMenu, setShowDropMenu] = useState(false)
  const theme = useSelector((state) => state.theme)
  const allBoards = useSelector((state) => state.data)
  const indexBoard = useSelector((state) => state.board)
  const dispatch = useDispatch()
  const board = allBoards[indexBoard]

  const chido = (e) => {
    e.stopPropagation()
    close()
  }

  const changeStatus = (value) => {
    const route = {...infoRoute, indexStatus: value}
    dispatch(changeStatusTask(route))
    close()
  }

  const openChe = () => {
    openEditTask()
    close()
  }

  const deleteTask = () => {
    openDeleteTask()
    close()
  }

  const catMenu = useRef(null)

  const closeOpenMenus = (e) =>{
    if(showDropMenu && !catMenu.current?.contains(e.target)){
      setShowDropMenu(false)
    }
  }

  document.addEventListener('mousedown',closeOpenMenus)

  return (
    <div className={styles.modal} onClick={(e) => chido(e)}>
      <section className={`${styles.modal_content} ${styles[theme]}`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.container_header}>
          <p className={`${styles.title} ${styles[theme]}`}>{task.title}</p>
          <button onClick={() => setShowDropMenu(!showDropMenu)} className={styles.button}>
            <img src="/assets/icon-vertical-ellipsis.svg" alt="" />
          </button>
          {showDropMenu &&
            <div className={`${styles.dropMenu} ${styles[theme]}`} ref={catMenu}>
              <span onClick={openChe} className={styles.text}>Edit Task</span>
              <span onClick={deleteTask} className={`${styles.text} ${styles.delete}`}>Delete Task</span>
            </div>
          }
        </div>
        {task.description && <p className={styles.description}>{task.description}</p>}
        <form action="" className={styles.form}>
          <p className={`${styles.label} ${styles[theme]} ${styles.subtasks}`}>Subtasks ({subtasks} of {task.subtasks.length})</p>
          {task.subtasks.map((item, index) => {
            return <Subtask key={index} isCompleted={item.isCompleted} text={item.title} index={index} infoRoute={infoRoute}/>
          })}
          <label htmlFor="status" className={`${styles.label} ${styles[theme]} ${styles.status}`}>Current Status</label>
          <select id="status" onChange={(e) => changeStatus(e.target.value)} defaultValue={infoRoute.indexColumn} className={`${styles.select} ${styles[theme]}`}>
            {board.columns.map((item, index) => {
              return <option value={index} key={index} className={`${styles.option} ${styles[theme]}`}>{item.name}</option>
            })}
          </select>
        </form>
      </section>
    </div>
  )
}

export default InfoTask