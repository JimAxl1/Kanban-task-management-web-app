import Header from './components/Header/Header';
import Main from './components/Main'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeBoard } from './reducers/boardSlice'
import styles from './App.module.scss';
import Aside from './components/Aside';
import NoBoards from './components/NoBoards';
import { useEffect } from 'react';

function App() {
  const [showSidebar, setShowSidebar] = useState(false)
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const board = useSelector((state) => state.board);
  const theme = useSelector((state) => state.theme)
  if (board === '' && data.length !== 0){
    dispatch(changeBoard(data[0].name))
  }

  document.body.style.backgroundColor = theme === 'light' ? '#F4F7FD' : '#20212C'

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(data));
  }, [data]);
  
  return (
    <>
      <Header sideBarActive={showSidebar} />
      {data.length > 0 ? <Main sideBarActive={showSidebar} /> : <NoBoards sideBarActive={showSidebar} />}
      <div className={styles.iconContainer} onClick={() => setShowSidebar(true)}>
        <img src="/assets/icon-show-sidebar.svg" alt="" className={styles.showSidebar} />
      </div>
      {showSidebar && <Aside close={() => setShowSidebar(false)} parent='app' />}
    </>
  );
}

export default App;
