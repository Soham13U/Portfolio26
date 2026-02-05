import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { playgroundData } from '../../data/playgroundData';
import styles from './Playground.module.css';

const getStatusColor = (status) => {
  switch (status) {
    case 'Completed':
      return '#4caf50';
    case 'Ongoing':
      return '#ff9800';
    case 'In Progress':
      return '#2196f3';
    case 'Experimental':
      return '#9c27b0';
    default:
      return '#8a8a8a';
  }
};

const PlaygroundCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.2 });

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div 
      ref={cardRef}
      className={styles.playgroundCard}
      variants={itemVariants}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      data-playground-index={index}
    >
      {item.image && (
        <div className={styles.playgroundImage}>
          <img src={item.image} alt={item.title} />
        </div>
      )}
      <div className={styles.cardHeader}>
        <span className={styles.playgroundIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <span 
          className={styles.statusBadge}
          style={{ 
            borderColor: getStatusColor(item.status),
            color: getStatusColor(item.status)
          }}
        >
          {item.status}
        </span>
      </div>
      <p className={styles.cardDescription}>{item.description}</p>
          <div className={styles.cardFooter}>
            <div className={styles.techStack}>
              {item.tech.map((tech, techIndex) => (
                <React.Fragment key={techIndex}>
                  <span className={styles.techItem}>{tech}</span>
                  {techIndex < item.tech.length - 1 && (
                    <span className={styles.separator}>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {(item.github || item.live) && (
              <div className={styles.projectLinks}>
                {item.github && (
                  <React.Fragment>
                    <a 
                      href={item.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Github
                    </a>
                    {item.live && (
                      <span className={styles.separator}>/</span>
                    )}
                  </React.Fragment>
                )}
                {item.live && (
                  <a 
                    href={item.live} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    Live
                  </a>
                )}
              </div>
            )}
      </div>
    </motion.div>
  );
};

const Playground = () => {
  return (
    <div className={styles.playground}>
      {playgroundData.map((item, index) => (
        <PlaygroundCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
};

export default Playground;
