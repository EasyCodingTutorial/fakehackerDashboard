'use client';

import { useEffect, useState } from 'react';
import styles from './DataStream.module.css';

const STREAM_TYPES = [
  'NETWORK_PACKET',
  'DATABASE_QUERY',
  'API_REQUEST',
  'FILE_TRANSFER',
  'ENCRYPTION_KEY',
  'SYSTEM_LOG',
];

const generateRandomData = () => {
  const type = STREAM_TYPES[Math.floor(Math.random() * STREAM_TYPES.length)];
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const randomHex = Array.from({ length: 16 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return {
    id: Math.random(),
    timestamp,
    type,
    data: randomHex,
    status: Math.random() > 0.8 ? 'ERROR' : 'OK'
  };
};

export default function DataStream() {
  const [streams, setStreams] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStreams(prev => {
        const newStream = generateRandomData();
        const updated = [newStream, ...prev].slice(0, 50);
        return updated;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.dataStream}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        DATA STREAM
      </div>
      <div className={styles.content}>
        {streams.map((stream) => (
          <div key={stream.id} className={styles.streamLine}>
            <span className={styles.timestamp}>[{stream.timestamp}]</span>
            <span className={styles.type}>{stream.type}</span>
            <span className={styles.data}>{stream.data}</span>
            <span className={`${styles.status} ${stream.status === 'ERROR' ? styles.error : styles.ok}`}>
              {stream.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
