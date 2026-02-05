import React from 'react';
import styles from './Socials.module.css';

const Socials = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'LinkedIn', url: 'https://linkedin.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Instagram', url: 'https://instagram.com' },
    { name: 'Email', url: 'mailto:contact@example.com' },
  ];

  return (
    <div className={styles.socials}>
      {socialLinks.map((social, index) => (
        <React.Fragment key={social.name}>
          <a
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label={social.name}
          >
            {social.name}
          </a>
          {index < socialLinks.length - 1 && (
            <span className={styles.separator}>/</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Socials;
