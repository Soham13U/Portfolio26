import React from 'react';
import { motion } from 'framer-motion';
import ContentArea from '../ContentArea/ContentArea';
import Quote from '../Quote/Quote';
import styles from './Welcome.module.css';

const Welcome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <ContentArea
      title="Welcome"
      description="Select a section from the left to explore my work, background, and creative projects."
      isActive={true}
    >
      <motion.div
        className={styles.welcome}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Quote Section */}
        <motion.div className={styles.quoteSection} variants={itemVariants}>
          <Quote />
        </motion.div>

        {/* When Online Section */}
        <motion.div className={styles.onlineSection} variants={itemVariants}>
          <p className={styles.sectionLabel}>When online:</p>
          <div className={styles.onlineItems}>
            <span className={styles.onlineItem}>Working</span>
            <span className={styles.separator}>|</span>
            <span className={styles.onlineItem}>Coding</span>
            <span className={styles.separator}>|</span>
            <span className={styles.onlineItem}>Developing</span>
          </div>
        </motion.div>

        {/* When Offline Section */}
        <motion.div className={styles.offlineSection} variants={itemVariants}>
          <p className={styles.sectionLabel}>When offline:</p>
          <div className={styles.offlineItems}>
            <span className={styles.offlineItem}>Piano</span>
            <span className={styles.separator}>|</span>
            <span className={styles.offlineItem}>Reading Philosophy</span>
            <span className={styles.separator}>|</span>
            <span className={styles.offlineItem}>Working Out</span>
          </div>
        </motion.div>
      </motion.div>
    </ContentArea>
  );
};

export default Welcome;
