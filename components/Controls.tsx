'use client';

import { useState } from 'react';
import styles from './Controls.module.css';

interface ControlsProps {
  onThemeChange: (theme: 'green' | 'blue' | 'red') => void;
  onFullscreenToggle: () => void;
  onSoundToggle: () => void;
  soundEnabled: boolean;
}

export default function Controls({ 
  onThemeChange, 
  onFullscreenToggle,
  onSoundToggle,
  soundEnabled 
}: ControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'green' | 'blue' | 'red'>('green');

  const handleThemeChange = (theme: 'green' | 'blue' | 'red') => {
    setCurrentTheme(theme);
    onThemeChange(theme);
  };

  return (
    <>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle controls"
      >
        <span className={styles.icon}>⚙</span>
      </button>

      <div className={`${styles.controls} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <span>CONTROLS</span>
          <button 
            className={styles.closeButton}
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>THEME</div>
          <div className={styles.themeButtons}>
            <button
              className={`${styles.themeButton} ${currentTheme === 'green' ? styles.active : ''}`}
              onClick={() => handleThemeChange('green')}
              style={{ '--theme-color': '#00ff41' } as any}
            >
              GREEN
            </button>
            <button
              className={`${styles.themeButton} ${currentTheme === 'blue' ? styles.active : ''}`}
              onClick={() => handleThemeChange('blue')}
              style={{ '--theme-color': '#00d9ff' } as any}
            >
              BLUE
            </button>
            <button
              className={`${styles.themeButton} ${currentTheme === 'red' ? styles.active : ''}`}
              onClick={() => handleThemeChange('red')}
              style={{ '--theme-color': '#ff0055' } as any}
            >
              RED
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.label}>OPTIONS</div>
          <button 
            className={styles.optionButton}
            onClick={onFullscreenToggle}
          >
            <span>⛶</span> FULLSCREEN
          </button>
          <button 
            className={`${styles.optionButton} ${soundEnabled ? styles.active : ''}`}
            onClick={onSoundToggle}
          >
            <span>{soundEnabled ? '🔊' : '🔇'}</span> SOUND
          </button>
        </div>
      </div>
    </>
  );
}
