import React from 'react';
import styles from './Quote.module.css';

const Quote = () => {
  const quote = "Design is not just what it looks like and feels like. Design is how it works.";
  const author = "— Steve Jobs";

  return (
    <div className={styles.quoteContainer}>
      <p className={styles.quote}>{quote}</p>
      <p className={styles.author}>{author}</p>
    </div>
  );
};

export default Quote;
