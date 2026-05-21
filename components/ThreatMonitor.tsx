'use client';

import { useEffect, useState } from 'react';
import styles from './ThreatMonitor.module.css';

interface Threat {
  id: number;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  timestamp: string;
}

const THREAT_TYPES = [
  'SQL Injection Attempt',
  'Brute Force Attack',
  'DDoS Attack',
  'Malware Detected',
  'Unauthorized Access',
  'Port Scan Detected',
  'Suspicious Activity',
  'Data Exfiltration',
  'XSS Attempt',
  'CSRF Attack'
];

const generateIP = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
};

export default function ThreatMonitor() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [stats, setStats] = useState({ low: 0, medium: 0, high: 0, critical: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      const severity: 'low' | 'medium' | 'high' | 'critical' = 
        rand > 0.9 ? 'critical' : rand > 0.7 ? 'high' : rand > 0.4 ? 'medium' : 'low';

      const newThreat: Threat = {
        id: Date.now(),
        type: THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)],
        severity,
        source: generateIP(),
        timestamp: new Date().toLocaleTimeString()
      };

      setThreats(prev => [newThreat, ...prev].slice(0, 10));
      setStats(prev => ({ ...prev, [severity]: prev[severity] + 1 }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.threatMonitor}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        THREAT MONITOR
      </div>

      <div className={styles.stats}>
        <div className={`${styles.statCard} ${styles.low}`}>
          <div className={styles.statValue}>{stats.low}</div>
          <div className={styles.statLabel}>LOW</div>
        </div>
        <div className={`${styles.statCard} ${styles.medium}`}>
          <div className={styles.statValue}>{stats.medium}</div>
          <div className={styles.statLabel}>MEDIUM</div>
        </div>
        <div className={`${styles.statCard} ${styles.high}`}>
          <div className={styles.statValue}>{stats.high}</div>
          <div className={styles.statLabel}>HIGH</div>
        </div>
        <div className={`${styles.statCard} ${styles.critical}`}>
          <div className={styles.statValue}>{stats.critical}</div>
          <div className={styles.statLabel}>CRITICAL</div>
        </div>
      </div>

      <div className={styles.content}>
        {threats.map((threat) => (
          <div key={threat.id} className={`${styles.threatLine} ${styles[threat.severity]}`}>
            <div className={styles.threatHeader}>
              <span className={styles.severityBadge}>{threat.severity.toUpperCase()}</span>
              <span className={styles.timestamp}>{threat.timestamp}</span>
            </div>
            <div className={styles.threatType}>{threat.type}</div>
            <div className={styles.source}>Source: {threat.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
