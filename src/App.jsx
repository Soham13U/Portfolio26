import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import Playground from './components/Playground/Playground';
import Socials from './components/Socials/Socials';
import ThemeCycler from './components/ThemeCycler/ThemeCycler';
import CustomCursor from './components/CustomCursor/CustomCursor';
import BackgroundGradient from './components/BackgroundGradient/BackgroundGradient';
import Welcome from './components/Welcome/Welcome';
import ContentArea from './components/ContentArea/ContentArea';
import ProgressMeter from './components/ProgressMeter/ProgressMeter';
import { projectsData } from './data/projectsData';
import { playgroundData } from './data/playgroundData';
import styles from './App.module.css';

function App() {
  const [activeContent, setActiveContent] = useState(null);
  const [theme, setTheme] = useState('monotone');
  const centerColumnRef = useRef(null);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const openContentHandler = (contentName) => {
    setActiveContent(contentName);
  };

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'playground', label: 'Playground' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Awwwards-style letter animation
  const firstName = 'Soham';
  const lastName = 'Upadeo';
  const firstNameArray = firstName.split('');
  const lastNameArray = lastName.split('');

  const letterVariants = {
    hidden: { opacity: 0, y: 100, rotateX: -90 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className={styles.app}>
      <BackgroundGradient />
      <CustomCursor />
      
      <div className={styles.layout}>
        {/* Left Column - Fixed/Sticky */}
        <motion.aside
          className={styles.leftColumn}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mobile Theme Button - Top Right */}
          <div className={styles.mobileThemeButton}>
            <ThemeCycler currentTheme={theme} onThemeChange={setTheme} />
          </div>

          {/* Name */}
          <motion.div className={styles.header} variants={itemVariants}>
            <h1 
              className={styles.mainTitle}
              onClick={() => openContentHandler(null)}
              style={{ cursor: 'none' }}
            >
              <span className={styles.titleWrapper}>
                {firstNameArray.map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    custom={i}
                    variants={letterVariants}
                    className={styles.letter}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <br className={styles.nameBreak} />
              <span className={styles.titleWrapper}>
                {lastNameArray.map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    custom={firstNameArray.length + i}
                    variants={letterVariants}
                    className={styles.letter}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Title */}
          <motion.p 
            className={styles.subtitle}
            variants={itemVariants}
          >
            Software Engineer
          </motion.p>

          {/* Navigation Links */}
          <nav className={styles.nav}>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                className={`${styles.navItem} ${activeContent === item.id ? styles.navItemActive : ''}`}
                onClick={() => openContentHandler(item.id)}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.navLabel}>{item.label}</span>
              </motion.button>
            ))}
          </nav>

          {/* Bottom Section - Socials */}
          <div className={styles.bottomSection}>
            {/* Socials */}
            <motion.div className={styles.socialsContainer} variants={itemVariants}>
              <Socials />
            </motion.div>
          </div>
        </motion.aside>

        {/* Center Column - Scrollable Content */}
        <main ref={centerColumnRef} className={styles.centerColumn}>
          {!activeContent && <Welcome />}
          
          <ContentArea
            title="About"
            description="Learn more about my background, skills, and experience"
            isActive={activeContent === 'about'}
          >
            <About />
          </ContentArea>

          <ContentArea
            title="Projects"
            description="A collection of my recent work and professional projects"
            isActive={activeContent === 'projects'}
          >
            <Projects />
          </ContentArea>

          <ContentArea
            title="Playground"
            description="Experimental projects and creative explorations"
            isActive={activeContent === 'playground'}
          >
            <Playground />
          </ContentArea>
          
          {/* Mobile Footer - Portfolio text at bottom of content */}
          <div className={styles.mobilePortfolioText}>
            <p className={styles.portfolioText}>Portfolio 2.0</p>
            <p className={styles.yearText}>2026</p>
          </div>
        </main>

        {/* Right Column */}
        <aside className={styles.rightColumn}>
          {/* Theme Cycler - Top Right */}
          <div className={styles.themeCyclerWrapper}>
            <ThemeCycler currentTheme={theme} onThemeChange={setTheme} />
          </div>
          
          <div className={styles.progressMeterWrapper}>
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={`progress-${activeContent}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProgressMeter activeContent={activeContent} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className={styles.rightColumnContent}>
            <p className={styles.portfolioText}>Portfolio 2.0</p>
            <p className={styles.yearText}>2026</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default App;
