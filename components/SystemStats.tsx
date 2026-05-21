'use client';

import { useEffect, useState } from 'react';
import styles from './SystemStats.module.css';

interface Stat {
  label: string;
  value: number;
  unit: string;
  max: number;
}

export default function SystemStats() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'CPU USAGE', value: 45, unit: '%', max: 100 },
    { label: 'MEMORY', value: 6.2, unit: 'GB', max: 16 },
    { label: 'NETWORK', value: 234, unit: 'MB/s', max: 1000 },
    { label: 'DISK I/O', value: 512, unit: 'MB/s', max: 2000 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => ({
        ...stat,
        value: Math.max(0, stat.value + (Math.random() - 0.5) * (stat.max * 0.1))
      })));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.systemStats}>
      <div className={styles.header}>SYSTEM STATS</div>
      <div className={styles.content}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <span className={styles.label}>{stat.label}</span>
              <span className={styles.value}>
                {stat.value.toFixed(stat.unit === '%' ? 0 : 1)} {stat.unit}
              </span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ 
                  width: `${(stat.value / stat.max) * 100}%`,
                  background: stat.value / stat.max > 0.8 ? '#ff0055' : 'var(--theme-primary)'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
