import React from "react";
import styles from "./Loading.module.css";
import SolarSystem from "./SolarSystem";

export default function Loader() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-clip">
        <SolarSystem />
      </div>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div className={styles.card}>
        <div className={styles.loader}>
          <p>loading</p>
          <div className={styles.words}>
            <span className={styles.word}>Definition</span>
            <span className={styles.word}>Antonyms</span>
            <span className={styles.word}>Synonyms</span>
            <span className={styles.word}>Word</span>
            <span className={styles.word}>Sentences</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
