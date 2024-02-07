import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import styles from './SvgComponent.module.scss';

const SvgComponent = ({ path, color, colorHover, container }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`${styles.container} ${styles[container]} ${isHovered ? styles[colorHover] : styles[color]}`}>
      <InlineSVG src={path} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />
    </div>
    
  );
};

export default SvgComponent;