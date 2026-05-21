'use client';

import { useEffect, useState } from 'react';
import styles from './AccessOverlay.module.css';

export default function AccessOverlay() {
  const [show, setShow] = useState(true);
  const [status, setStatus] = useState<'checking' | 'granted' | 'hidden'>('checking');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setStatus('granted');
    }, 2000);

    const timer2 = setTimeout(() => {
      setStatus('hidden');
      setShow(false);
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`${styles.overlay} ${status === 'hidden' ? styles.fadeOut : ''}`}>
      <div className={styles.content}>
        {status === 'checking' && (
          <>
            <div className={styles.spinner}></div>
            <div className={styles.text}>AUTHENTICATING...</div>
            <div className={styles.subtext}>Verifying credentials</div>
          </>
        )}
        {status === 'granted' && (
          <>
            <div className={styles.checkmark}>✓</div>
            <div className={styles.text}>ACCESS GRANTED</div>
            <div className={styles.subtext}>Welcome back, User</div>
          </>
        )}
      </div>
      <div className={styles.scanline}></div>
    </div>
  );
}
