'use client';

import { useEffect, useState } from 'react';
import styles from './IPTracker.module.css';

interface IPData {
  ip: string;
  location: string;
  status: 'tracking' | 'located' | 'lost';
  timestamp: string;
}

const LOCATIONS = [
  'Tokyo, Japan', 'New York, USA', 'London, UK', 'Berlin, Germany',
  'Moscow, Russia', 'Beijing, China', 'Sydney, Australia', 'Mumbai, India',
  'São Paulo, Brazil', 'Dubai, UAE', 'Singapore', 'Toronto, Canada'
];

const generateIP = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
};

export default function IPTracker() {
  const [ips, setIps] = useState<IPData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIP: IPData = {
        ip: generateIP(),
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        status: Math.random() > 0.8 ? 'lost' : 'located',
        timestamp: new Date().toLocaleTimeString()
      };

      setIps(prev => [newIP, ...prev].slice(0, 8));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.ipTracker}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        IP TRACKER
      </div>
      <div className={styles.content}>
        {ips.map((ip, index) => (
          <div key={index} className={`${styles.ipLine} ${styles[ip.status]}`}>
            <span className={styles.ip}>{ip.ip}</span>
            <span className={styles.location}>{ip.location}</span>
            <span className={styles.status}>
              {ip.status === 'located' ? '✓' : '✗'}
            </span>
            <span className={styles.timestamp}>{ip.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
