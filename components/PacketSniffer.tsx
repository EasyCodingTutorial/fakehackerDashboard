'use client';

import { useEffect, useState } from 'react';
import styles from './PacketSniffer.module.css';

interface Packet {
  id: number;
  protocol: string;
  source: string;
  destination: string;
  size: number;
  flag: string;
}

const PROTOCOLS = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'SSH', 'FTP'];
const FLAGS = ['SYN', 'ACK', 'PSH', 'FIN', 'RST', 'URG'];

const generateIP = () => {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
};

export default function PacketSniffer() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [packetCount, setPacketCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newPacket: Packet = {
        id: Date.now(),
        protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
        source: generateIP(),
        destination: generateIP(),
        size: Math.floor(Math.random() * 1500) + 64,
        flag: FLAGS[Math.floor(Math.random() * FLAGS.length)]
      };

      setPackets(prev => [newPacket, ...prev].slice(0, 20));
      setPacketCount(prev => prev + 1);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.packetSniffer}>
      <div className={styles.header}>
        <span className={styles.indicator}></span>
        PACKET SNIFFER
        <span className={styles.count}>{packetCount} packets</span>
      </div>
      <div className={styles.content}>
        <div className={styles.tableHeader}>
          <span>PROTOCOL</span>
          <span>SOURCE</span>
          <span>DESTINATION</span>
          <span>SIZE</span>
          <span>FLAG</span>
        </div>
        {packets.map((packet) => (
          <div key={packet.id} className={styles.packetLine}>
            <span className={`${styles.protocol} ${styles[packet.protocol.toLowerCase()]}`}>
              {packet.protocol}
            </span>
            <span className={styles.ip}>{packet.source}</span>
            <span className={styles.ip}>{packet.destination}</span>
            <span className={styles.size}>{packet.size}B</span>
            <span className={styles.flag}>{packet.flag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
