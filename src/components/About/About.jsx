import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { aboutData } from '../../data/aboutData';
import styles from './About.module.css';

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      ref={ref}
      className={className}
      variants={itemVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const introRef = useRef(null);
  const introInView = useInView(introRef, { once: true, amount: 0.2 });

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
    <div className={styles.about}>
      <motion.div 
        ref={introRef}
        className={styles.intro}
        variants={itemVariants}
        initial="hidden"
        animate={introInView ? "visible" : "hidden"}
      >
        <h3 className={styles.name}>{aboutData.name}</h3>
        <p className={styles.title}>{aboutData.title}</p>
        <div className={styles.photoContainer}>
          <img 
            src={`${import.meta.env.BASE_URL}Soham.jpg`} 
            alt={aboutData.name}
            className={styles.photo}
          />
        </div>
      </motion.div>

      <AnimatedSection className={styles.section}>
        <div data-section-title="About">
          <h4 className={styles.sectionTitle}>About</h4>
        <ul className={styles.bioList}>
          {aboutData.bio.map((point, index) => (
            <li key={index} className={styles.bioItem}>{point}</li>
          ))}
        </ul>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Location</span>
            <span>{aboutData.location}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Email</span>
            <span>{aboutData.email}</span>
          </div>
        </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section}>
        <div data-section-title="Skills">
          <h4 className={styles.sectionTitle}>Skills</h4>
        <div className={styles.skillsContainer}>
          {Object.entries(aboutData.skills).map(([category, skills], categoryIndex) => (
            <div key={categoryIndex} className={styles.skillGroup}>
              <span className={styles.skillCategory}>{category}</span>
              <span className={styles.skillDash}>-</span>
              <span className={styles.skillBracket}>[</span>
              <div className={styles.skillsList}>
                {skills.map((skill, skillIndex) => (
                  <React.Fragment key={skillIndex}>
                    <span className={styles.skillItem}>{skill}</span>
                    {skillIndex < skills.length - 1 && (
                      <span className={styles.separator}>/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <span className={styles.skillBracket}>]</span>
            </div>
          ))}
        </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section}>
        <div data-section-title="Experience">
          <h4 className={styles.sectionTitle}>Experience</h4>
        {aboutData.experience.map((exp, index) => (
          <div key={index} className={styles.experienceItem}>
            <div className={styles.experienceHeader}>
              <h5 className={styles.role}>{exp.role}</h5>
              <span className={styles.period}>{exp.period}</span>
            </div>
            <p className={styles.company}>{exp.company}</p>
            {exp.location && <p className={styles.location}>{exp.location}</p>}
            <ul className={styles.descriptionList}>
              {exp.description.map((point, pointIndex) => (
                <li key={pointIndex} className={styles.descriptionItem}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className={styles.section}>
        <div data-section-title="Education">
          <h4 className={styles.sectionTitle}>Education</h4>
        {aboutData.education.map((edu, index) => (
          <div key={index} className={styles.education}>
            <div className={styles.educationHeader}>
              <h5 className={styles.degree}>{edu.degree}</h5>
              <span className={styles.year}>{edu.year}</span>
            </div>
            <p className={styles.university}>{edu.university}</p>
            {edu.gpa && <p className={styles.gpa}>GPA: {edu.gpa}</p>}
          </div>
        ))}
        </div>
      </AnimatedSection>
    </div>
  );
};

export default About;
