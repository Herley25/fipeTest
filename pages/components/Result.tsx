import React from 'react';

import styles from '../../styles/Result.module.css';

interface IResult {
  title: string;
  price: string;
  text: string;
}

const Result = ({ title, price, text }: IResult): JSX.Element => (
  <div className={styles.container}>
    <h3 className={styles.text_result}>Resultado</h3>
    <div className={styles.content}>
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.money}>
        <p className={styles.value}>{price}</p>
      </div>
      <p className={styles.text_bottom}>{text}</p>
    </div>
  </div>
);

export default Result;
