import React from 'react';
import { motion } from 'framer-motion';
import styles from './ThemeCycler.module.css';

const themes = [
  { id: 'monotone', name: 'Monotone', color: '#808080' },
  { id: 'dark', name: 'Dark', color: '#ffffff' },
  { id: 'light', name: 'Light', color: '#d97757' },
  { id: 'burgundy', name: 'Burgundy', color: '#bc3e32' },
];

const ThemeCycler = ({ currentTheme, onThemeChange }) => {
  const currentIndex = themes.findIndex(t => t.id === currentTheme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const handleClick = () => {
    onThemeChange(nextTheme.id);
  };

  return (
    <motion.button
      className={styles.cycler}
      onClick={handleClick}
      whileHover={{ opacity: 1 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Cycle theme"
      title={`Switch to ${nextTheme.name}`}
    >
      <span className={styles.themeLabel}>Theme</span>
      <motion.span
        className={styles.colorDot}
        style={{ backgroundColor: nextTheme.color }}
        key={nextTheme.id}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </motion.button>
  );
};

export default ThemeCycler;
