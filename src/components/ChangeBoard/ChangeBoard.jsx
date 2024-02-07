import React from 'react';
import InlineSVG from 'react-inlinesvg';
import styles from './ChangeBoard.module.scss'

const ChangeBoard = ({ handleFunction, close, name, selected, theme }) => {
  return (
    <li key={name} className={`${styles.boards} ${selected && styles.selected} ${styles[theme]}`} onClick={close}>
      <button onClick={() => handleFunction()} className={styles.button}>
        <InlineSVG src='/assets/icon-board.svg' />
        {name}
      </button>
    </li>
  );
};

export default ChangeBoard;