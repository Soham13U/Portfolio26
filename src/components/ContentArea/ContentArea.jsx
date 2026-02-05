import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ContentArea.module.css';

const ContentArea = ({ title, description, children, isActive }) => {
  const contentRef = useRef(null);

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={title}
          className={styles.contentArea}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <h2 className={styles.title}>{title}</h2>
              {description && <p className={styles.description}>{description}</p>}
            </div>
          </div>
          <motion.div 
            ref={contentRef}
            className={styles.content}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContentArea;
