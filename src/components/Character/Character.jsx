import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Character.module.css';

const Character = ({ position, expression, onInteraction }) => {
  const [currentExpression, setCurrentExpression] = useState(expression || 'idle');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (expression && expression !== currentExpression) {
      setIsAnimating(true);
      setCurrentExpression(expression);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [expression, currentExpression]);

  const getExpressionClass = () => {
    const baseClass = styles.character;
    const expressionClass = styles[currentExpression] || styles.idle;
    const animatingClass = isAnimating ? styles.animating : '';
    return `${baseClass} ${expressionClass} ${animatingClass}`.trim();
  };

  const characterVariants = {
    welcome: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    sidebar: {
      scale: 0.8,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Get eye shapes based on expression
  const getEyes = () => {
    switch (currentExpression) {
      case 'happy':
        return (
          <>
            <circle cx="28" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="52" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'curious':
        return (
          <>
            <ellipse cx="28" cy="28" rx="1.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="52" cy="28" rx="1.5" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'thinking':
        return (
          <>
            <ellipse cx="28" cy="30" rx="1" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="52" cy="30" rx="1" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'excited':
        return (
          <>
            <circle cx="28" cy="28" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="52" cy="28" r="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'scrolling':
        return (
          <>
            <ellipse cx="28" cy="28" rx="1.5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="52" cy="28" rx="1.5" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'about':
        return (
          <>
            <ellipse cx="28" cy="29" rx="1.2" ry="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="52" cy="29" rx="1.2" ry="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'projects':
        return (
          <>
            <circle cx="28" cy="28" r="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="52" cy="28" r="2.2" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      case 'playground':
        return (
          <>
            <circle cx="28" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="52" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
      default: // idle
        return (
          <>
            <circle cx="28" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="52" cy="28" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
          </>
        );
    }
  };

  const getMouth = () => {
    switch (currentExpression) {
      case 'happy':
        return <path d="M 30 48 Q 40 56 50 48" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />;
      case 'curious':
        return <ellipse cx="40" cy="48" rx="2" ry="1.5" fill="none" stroke="currentColor" strokeWidth="1" />;
      case 'thinking':
        return <line x1="35" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />;
      case 'excited':
        return <path d="M 25 45 Q 40 58 55 45" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />;
      case 'scrolling':
        return <line x1="33" y1="50" x2="47" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />;
      case 'about':
        return <line x1="35" y1="51" x2="45" y2="51" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />;
      case 'projects':
        return <path d="M 28 48 Q 40 54 52 48" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />;
      case 'playground':
        return <path d="M 30 47 Q 40 53 50 47" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" />;
      default: // idle
        return <line x1="35" y1="50" x2="45" y2="50" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />;
    }
  };

  return (
    <motion.div
      className={getExpressionClass()}
      variants={characterVariants}
      initial={position === 'welcome' ? 'welcome' : 'sidebar'}
      animate={position === 'welcome' ? 'welcome' : 'sidebar'}
      onClick={onInteraction}
      style={{ cursor: 'none' }}
    >
      <svg
        viewBox="0 0 80 80"
        className={styles.svgCharacter}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head - thin outline */}
        <circle
          cx="40"
          cy="40"
          r="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className={styles.head}
        />
        
        {/* Eyes */}
        <g className={styles.eyes}>
          {getEyes()}
        </g>
        
        {/* Mouth */}
        <g className={styles.mouth}>
          {getMouth()}
        </g>
      </svg>
    </motion.div>
  );
};

export default Character;
