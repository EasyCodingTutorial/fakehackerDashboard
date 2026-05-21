'use client';

import { useEffect, useState } from 'react';
import styles from './CryptoMonitor.module.css';

interface HashData {
  id: number;
  algorithm: string;
  input: string;
  hash: string;
  status: 'processing' | 'complete';
}

const ALGORITHMS = ['SHA-256', 'MD5', 'SHA-512', 'BLAKE2', 'SHA-1'];

const generateRandomHash = (length: number) => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

const generateRandomString = () => {
  const words = ['data', 'packet', 'stream', 'key', 'token', 'auth', 'session', 'user'];
  return words[Math.floor(Math.random() * words.length)] + Math.floor(Math.random() * 10000);
};

export default function CryptoMonitor() {
  const [hashes, setHashes] = useState<HashData[]>([]);
  const [totalHashes, setTotalHashes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const algorithm = ALGORITHMS[Math.floor(Math.random() * ALGORITHMS.length)];
      const hashLength = algorithm === 'MD5' ? 32 : algorithm === 'SHA-1' ? 40 : 64;

      const newHash: HashData = {
        id: Date.now(),
        algorithm,
        input: generateRandomString(),
        hash: generateRandomHash(hashLength),
        status: 'processing'
      };

      setHashes(prev => [newHash, ...prev].slice(0, 6));
      setTotalHashes(prev => prev + 1);

      // Mark as complete after delay
      setTimeout(() => {
        setHashes(prev => prev.map(h => 
          h.id === newHash.id ? { ...h, status: 'complete' } : h
        ));
      }, 1000);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.cryptoMonitor}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        CRYPTO HASH GENERATOR
        <span className={styles.count}>{totalHashes} hashes</span>
      </div>
      <div className={styles.content}>
        {hashes.map((hash) => (
          <div key={hash.id} className={`${styles.hashBlock} ${styles[hash.status]}`}>
            <div className={styles.hashHeader}>
              <span className={styles.algorithm}>{hash.algorithm}</span>
              <span className={styles.status}>
                {hash.status === 'processing' ? '⟳' : '✓'}
              </span>
            </div>
            <div className={styles.input}>
              <span className={styles.label}>INPUT:</span>
              <span className={styles.value}>{hash.input}</span>
            </div>
            <div className={styles.output}>
              <span className={styles.label}>HASH:</span>
              <span className={styles.hashValue}>{hash.hash}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
