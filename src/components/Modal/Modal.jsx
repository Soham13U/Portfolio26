import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, title, description, children }) => {
  const modalRef = useRef(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, top: 0, right: 0, bottom: 0 });

  const updateDragConstraints = useCallback(() => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect();
      setDragConstraints({
        left: -rect.left,
        top: -rect.top,
        right: window.innerWidth - rect.right,
        bottom: window.innerHeight - rect.bottom,
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        updateDragConstraints();
      }, 100);
      window.addEventListener('resize', updateDragConstraints);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('resize', updateDragConstraints);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', updateDragConstraints);
    };
  }, [isOpen, updateDragConstraints]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            drag
            dragMomentum={false}
            dragConstraints={dragConstraints}
            dragElastic={0.1}
          >
            <div className={styles.header} onPointerDown={(e) => e.stopPropagation()}>
              <div className={styles.headerContent}>
                <h2 className={styles.title}>{title}</h2>
                {description && <p className={styles.description}>{description}</p>}
              </div>
              <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>
            <div className={styles.content}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
