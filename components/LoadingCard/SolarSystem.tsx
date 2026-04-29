"use client";

import styles from "./SolarSystem.module.css";

export default function SolarSystem() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={styles.solarSystem}>
        <div>
          <div className={styles.corona}></div>
        </div>

        <div className={`${styles.orbit} ${styles.mercuryOrbit}`}>
          <div className={`${styles.planet} ${styles.mercury}`}></div>
        </div>

        <div className={`${styles.orbit} ${styles.venusOrbit}`}>
          <div className={`${styles.planet} ${styles.venus}`}></div>
        </div>

        <div className={`${styles.orbit} ${styles.earthOrbit}`}>
          <div className={`${styles.planet} ${styles.earth}`}>
            <div className={styles.moon}></div>
          </div>

          <div className={styles.iss}>
            <div className={styles.issPanels}></div>
          </div>
        </div>

        <div className={`${styles.orbit} ${styles.marsOrbit}`}>
          <div className={`${styles.planet} ${styles.mars}`}></div>
        </div>

        <div className={styles.stars}>
          <div className={`${styles.star} ${styles.star1}`}></div>
          <div className={`${styles.star} ${styles.star2}`}></div>
          <div className={`${styles.star} ${styles.star3}`}></div>
          <div className={`${styles.star} ${styles.star4}`}></div>
          <div className={`${styles.star} ${styles.star5}`}></div>
        </div>
      </div>
    </div>
  );
}
