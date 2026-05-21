'use client';

import { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';
import DataStream from '@/components/DataStream';
import SystemStats from '@/components/SystemStats';
import NetworkMap from '@/components/NetworkMap';
import MatrixRain from '@/components/MatrixRain';
import Controls from '@/components/Controls';
import AccessOverlay from '@/components/AccessOverlay';
import styles from './page.module.css';

export default function Home() {
  const [theme, setTheme] = useState<'green' | 'blue' | 'red'>('green');
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleFullscreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    // Sound implementation can be added here
  };

  return (
    <>
      <AccessOverlay />
      <MatrixRain />
      
      <main className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>◈</span>
            <span className={styles.logoText}>CYBEROPS</span>
          </div>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            <span>SYSTEM ONLINE</span>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.terminalSection}>
            <Terminal />
          </div>

          <div className={styles.dataSection}>
            <DataStream />
          </div>

          <div className={styles.statsSection}>
            <SystemStats />
          </div>

          <div className={styles.mapSection}>
            <NetworkMap />
          </div>
        </div>

        <Controls
          onThemeChange={setTheme}
          onFullscreenToggle={handleFullscreenToggle}
          onSoundToggle={handleSoundToggle}
          soundEnabled={soundEnabled}
        />
      </main>
    </>
  );
}
