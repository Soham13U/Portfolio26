import React from 'react';
import { motion } from 'framer-motion';
import ContentArea from '../ContentArea/ContentArea';
import { aboutData } from '../../data/aboutData';
import styles from './Welcome.module.css';

const Welcome = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const weatherSummary = 'India · Clear skies · 24°C';
  const workingOnItems = [
    'Designing thoughtful interfaces',
    'Building scalable systems',
    'Crafting elegant solutions',
    'Exploring new technologies'
  ];
  const [currentItemIndex, setCurrentItemIndex] = React.useState(0);
  const [typingText, setTypingText] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(true);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const currentItem = workingOnItems[currentItemIndex];
    let timeoutId;

    if (isTyping && !isDeleting) {
      // Typing forward
      if (typingText.length < currentItem.length) {
        timeoutId = setTimeout(() => {
          setTypingText(currentItem.slice(0, typingText.length + 1));
        }, 100);
      } else {
        // Finished typing, wait then start deleting
        timeoutId = setTimeout(() => {
          setIsTyping(false);
          setIsDeleting(true);
        }, 2000);
      }
    } else if (isDeleting) {
      // Deleting backward
      if (typingText.length > 0) {
        timeoutId = setTimeout(() => {
          setTypingText(currentItem.slice(0, typingText.length - 1));
        }, 50);
      } else {
        // Finished deleting, move to next item
        setIsDeleting(false);
        setCurrentItemIndex((prev) => (prev + 1) % workingOnItems.length);
        setIsTyping(true);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [typingText, isTyping, isDeleting, currentItemIndex]);

  return (
    <ContentArea
      title="Welcome"
      description=""
      isActive={true}
    >
      <motion.div
        className={styles.welcome}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Two-Column Layout */}
        <div className={styles.welcomeContent}>
          {/* Left Column - Text Stack */}
          <motion.div className={styles.descriptionColumn} variants={itemVariants}>
            {/* Developer Description */}
            <p className={styles.developerDescription}>
              {aboutData.welcomeDescription || "A software engineer passionate about creating elegant solutions that bridge the gap between aesthetics and functionality."}
            </p>

            {/* Timeline - Micro Timeline */}
            <div className={styles.historyBlock}>
              <h3 className={styles.historyTitle}>Timeline</h3>
              <div className={styles.timeline}>
                {aboutData.briefHistory ? (
                  aboutData.briefHistory.map((item, index) => (
                    <div key={index} className={styles.timelineItem}>
                      <span className={styles.timelineYear}>{item.year}</span>
                      <span className={styles.timelineDash}>-</span>
                      <span className={styles.timelineDescription}>{item.description}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className={styles.timelineItem}>
                      <span className={styles.timelineYear}>2019</span>
                      <span className={styles.timelineDash}>-</span>
                      <span className={styles.timelineDescription}>Started building small web experiments after class</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <span className={styles.timelineYear}>2023</span>
                      <span className={styles.timelineDash}>-</span>
                      <span className={styles.timelineDescription}>Shipped full‑stack projects and game prototypes</span>
                    </div>
                    <div className={styles.timelineItem}>
                      <span className={styles.timelineYear}>2025</span>
                      <span className={styles.timelineDash}>-</span>
                      <span className={styles.timelineDescription}>Focused on product‑quality UI and developer experience</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Enhanced Info Panel */}
          <motion.div className={styles.panelColumn} variants={itemVariants}>
            <motion.div 
              className={styles.infoPanel}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Time with Animation */}
              <motion.div 
                className={styles.infoRow}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className={styles.infoLabel}>Time</p>
                <p className={styles.infoValue}>{formattedTime} IST</p>
              </motion.div>

              {/* Weather */}
              <div className={styles.infoRow}>
                <p className={styles.infoLabel}>Weather</p>
                <p className={styles.infoValue}>{weatherSummary}</p>
              </div>

              {/* Working On with Typing/Backspace Animation */}
              <div className={styles.infoRow}>
                <p className={styles.infoLabel}>Working on</p>
                <p className={styles.infoValue}>
                  <span className={styles.typingText}>
                    {typingText}
                    <span className={styles.cursor}>|</span>
                  </span>
                </p>
              </div>

              {/* Hobbies Section - Vertical List */}
              <div className={styles.hobbiesSection}>
                <p className={styles.infoLabel}>Hobbies</p>
                <div className={styles.hobbiesList}>
                  {['Piano', 'Philosophy', 'Reading'].map((hobby, index) => (
                    <motion.p
                      key={index}
                      className={styles.hobbyItem}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ x: 4, color: 'var(--accent)' }}
                    >
                      {hobby}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </ContentArea>
  );
};

export default Welcome;
