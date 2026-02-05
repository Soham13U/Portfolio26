import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { projectsData } from '../../data/projectsData';
import styles from './Projects.module.css';

const ProjectCard = ({ project, index }) => {
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
      className={styles.projectCard}
      variants={itemVariants}
      initial="hidden"
      animate={cardInView ? "visible" : "hidden"}
      data-project-index={index}
    >
      <div className={styles.projectImage}>
        <img src={project.image} alt={project.title} />
      </div>
      <div className={styles.projectContent}>
        <div className={styles.projectHeader}>
          <span className={styles.projectIndex}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <span className={styles.projectYear}>{project.year}</span>
        </div>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.techStack}>
              {project.tech.map((tech, techIndex) => (
                <React.Fragment key={techIndex}>
                  <span className={styles.techItem}>{tech}</span>
                  {techIndex < project.tech.length - 1 && (
                    <span className={styles.separator}>/</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            {(project.github || project.live) && (
              <div className={styles.projectLinks}>
                {project.github && (
                  <React.Fragment>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                    >
                      Github
                    </a>
                    {project.live && (
                      <span className={styles.separator}>/</span>
                    )}
                  </React.Fragment>
                )}
                {project.live && (
                  <a 
                    href={project.live} 
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

const Projects = () => {
  return (
    <div className={styles.projects}>
      {projectsData.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
};

export default Projects;
