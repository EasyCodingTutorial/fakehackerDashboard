'use client';

import { useEffect, useState } from 'react';
import styles from './PortScanner.module.css';

interface Port {
  number: number;
  service: string;
  status: 'open' | 'closed' | 'filtered';
}

const SERVICES = [
  { port: 21, name: 'FTP' },
  { port: 22, name: 'SSH' },
  { port: 23, name: 'TELNET' },
  { port: 25, name: 'SMTP' },
  { port: 53, name: 'DNS' },
  { port: 80, name: 'HTTP' },
  { port: 110, name: 'POP3' },
  { port: 143, name: 'IMAP' },
  { port: 443, name: 'HTTPS' },
  { port: 3306, name: 'MySQL' },
  { port: 3389, name: 'RDP' },
  { port: 5432, name: 'PostgreSQL' },
  { port: 8080, name: 'HTTP-ALT' },
  { port: 27017, name: 'MongoDB' },
];

export default function PortScanner() {
  const [ports, setPorts] = useState<Port[]>([]);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    startScan();
  }, []);

  const startScan = async () => {
    setScanning(true);
    setPorts([]);
    setProgress(0);

    for (let i = 0; i < SERVICES.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      
      const service = SERVICES[i];
      const rand = Math.random();
      const status: 'open' | 'closed' | 'filtered' = 
        rand > 0.7 ? 'open' : rand > 0.4 ? 'closed' : 'filtered';

      setPorts(prev => [...prev, {
        number: service.port,
        service: service.name,
        status
      }]);

      setProgress(((i + 1) / SERVICES.length) * 100);
    }

    setScanning(false);
    
    // Restart scan after delay
    setTimeout(startScan, 5000);
  };

  return (
    <div className={styles.portScanner}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        PORT SCANNER
        {scanning && <span className={styles.scanning}>SCANNING...</span>}
      </div>
      
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className={styles.content}>
        <div className={styles.tableHeader}>
          <span>PORT</span>
          <span>SERVICE</span>
          <span>STATUS</span>
        </div>
        {ports.map((port, index) => (
          <div key={index} className={`${styles.portLine} ${styles[port.status]}`}>
            <span className={styles.portNumber}>{port.number}</span>
            <span className={styles.service}>{port.service}</span>
            <span className={styles.status}>{port.status.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
