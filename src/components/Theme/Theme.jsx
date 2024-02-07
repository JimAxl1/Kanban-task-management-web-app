import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './theme.module.scss'
import { changeTheme } from '../../reducers/themeSlice'

const Theme = () => {
  const theme = useSelector((state) => state.theme);
  const [active, setActive] = useState(theme === 'light' ? false : true)
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(changeTheme())
    setActive(!active)
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <img src="/assets/icon-light-theme.svg" alt="" className={styles.img} />
      <div className={styles.toggle_switch}> 
        <input type="checkbox" className={styles.checkbox} checked={active} onChange={() => handleClick()}/> 
        <label className={styles.label} onClick={() => handleClick()}> 
          <span className={styles.inner} /> 
          <span className={styles.switch} /> 
        </label> 
      </div> 
      <img src="/assets/icon-dark-theme.svg" alt="" className={styles.img} />
    </div> 
  )
}

export default Theme