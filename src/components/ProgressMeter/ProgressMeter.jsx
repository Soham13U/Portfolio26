import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import { playgroundData } from '../../data/playgroundData';
import styles from './ProgressMeter.module.css';

const ProgressMeter = ({ activeContent }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  // Get items and tooltips based on active content
  const getItemsAndTooltips = () => {
    if (activeContent === 'projects') {
      return {
        items: projectsData.map((_, index) => String(index + 1).padStart(2, '0')),
        tooltips: projectsData.map(project => project.title)
      };
    } else if (activeContent === 'playground') {
      return {
        items: playgroundData.map((_, index) => String(index + 1).padStart(2, '0')),
        tooltips: playgroundData.map(item => item.title)
      };
    } else if (activeContent === 'about') {
      const sectionTitles = ['About', 'Skills', 'Experience', 'Education'];
      return {
        items: sectionTitles.map((_, index) => String(index + 1).padStart(2, '0')),
        tooltips: sectionTitles
      };
    }
    return { items: [], tooltips: [] };
  };

  const { items, tooltips } = getItemsAndTooltips();

  // Find scroll container
  useEffect(() => {
    scrollContainerRef.current = null;
    
    const findScrollContainer = () => {
      // Find the active ContentArea's content div
      const contentAreas = document.querySelectorAll('[class*="contentArea"]');
      for (const area of contentAreas) {
        const style = window.getComputedStyle(area);
        if (style.display !== 'none' && parseFloat(style.opacity) > 0) {
          const contentDiv = area.querySelector('[class*="content"]');
          if (contentDiv) {
            return contentDiv;
          }
        }
      }
      return null;
    };

    // Retry finding container with increasing delays
    const tryFind = (attempt = 0) => {
      const container = findScrollContainer();
      if (container) {
        scrollContainerRef.current = container;
      } else if (attempt < 5) {
        setTimeout(() => tryFind(attempt + 1), 100 * (attempt + 1));
      }
    };

    tryFind();
  }, [activeContent]);

  // Setup scroll listener
  useEffect(() => {
    // Reset on content change
    setScrollProgress(0);
    setActiveIndex(0);

    if (items.length === 0) {
      return;
    }

    let cleanup = null;
    let retryTimer = null;

    const setupScrollListener = () => {
      if (!scrollContainerRef.current) {
        // Retry if container not found yet
        retryTimer = setTimeout(setupScrollListener, 100);
        return;
      }

      const container = scrollContainerRef.current;

      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const totalScroll = scrollHeight - clientHeight;
        const progress = totalScroll > 0 ? Math.min(1, Math.max(0, scrollTop / totalScroll)) : 0;
        setScrollProgress(progress);

        // Find active item by checking which element is in view
        const containerRect = container.getBoundingClientRect();
        const viewportCenter = containerRect.top + containerRect.height / 2;
        
        let currentIndex = 0;
        let closestDistance = Infinity;

        // Find elements based on active content
        let selectors = [];
        if (activeContent === 'projects') {
          selectors = projectsData.map((_, i) => `[data-project-index="${i}"]`);
        } else if (activeContent === 'playground') {
          selectors = playgroundData.map((_, i) => `[data-playground-index="${i}"]`);
        } else if (activeContent === 'about') {
          selectors = [
            '[data-section-title="About"]',
            '[data-section-title="Skills"]',
            '[data-section-title="Experience"]',
            '[data-section-title="Education"]'
          ];
        }

        selectors.forEach((selector, index) => {
          const element = container.querySelector(selector);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const distance = Math.abs(elementCenter - viewportCenter);
            
            if (rect.top <= containerRect.bottom && rect.bottom >= containerRect.top) {
              if (distance < closestDistance) {
                closestDistance = distance;
                currentIndex = index;
              }
            }
          }
        });

        setActiveIndex(currentIndex);
      };

      container.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      cleanup = () => {
        container.removeEventListener('scroll', handleScroll);
      };
    };

    setupScrollListener();

    return () => {
      if (retryTimer) clearTimeout(retryTimer);
      if (cleanup) cleanup();
    };
  }, [activeContent, items.length]);

  // Scroll to item
  const scrollToItem = (index) => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    
    // Find the target element
    let selector = '';
    if (activeContent === 'projects') {
      selector = `[data-project-index="${index}"]`;
    } else if (activeContent === 'playground') {
      selector = `[data-playground-index="${index}"]`;
    } else if (activeContent === 'about') {
      const titles = ['About', 'Skills', 'Experience', 'Education'];
      selector = `[data-section-title="${titles[index]}"]`;
    }

    const element = container.querySelector(selector);
    if (element) {
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const targetScroll = scrollTop + elementRect.top - containerRect.top - 100; // 100px offset

      container.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={styles.progressMeter}>
      <div className={styles.lineContainer}>
        <div className={styles.lineBackground} />
        <motion.div 
          className={styles.lineProgress}
          style={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
        />
      </div>
      
      <div className={styles.items}>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const tooltip = tooltips[index] || '';
          const showTooltip = activeContent === 'about' && tooltip;
          
          return (
            <button
              key={index}
              className={`${styles.item} ${isActive ? styles.itemActive : ''}`}
              onClick={() => scrollToItem(index)}
              aria-label={tooltip || item}
            >
              <span className={styles.itemLabel}>{item}</span>
              {showTooltip && (
                <span className={styles.tooltip}>{tooltip}</span>
              )}
              <div className={`${styles.itemDot} ${isActive ? styles.itemDotActive : ''}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressMeter;
