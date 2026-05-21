'use client';

import { useState, useEffect } from 'react';
import Terminal from '@/components/Terminal';
import DataStream from '@/components/DataStream';
import SystemStats from '@/components/SystemStats';
import NetworkMap from '@/components/NetworkMap';
import MatrixRain from '@/components/MatrixRain';
import Controls from '@/components/Controls';
import AccessOverlay from '@/components/AccessOverlay';
import ThreatMonitor from '@/components/ThreatMonitor';
import PacketSniffer from '@/components/PacketSniffer';
import IPTracker from '@/components/IPTracker';
import PortScanner from '@/components/PortScanner';
import CryptoMonitor from '@/components/CryptoMonitor';
import styles from './page.module.css';

export default function Home() {
  const [theme, setTheme] = useState<'green' | 'blue' | 'red'>('green');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    component: React.ReactNode;
  } | null>(null);

  useEffect(() => {
    // Apply theme
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const openModal = (title: string, component: React.ReactNode) => {
    setModalContent({ title, component });
  };

  const closeModal = () => {
    setModalContent(null);
  };

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
          <div 
            className={`${styles.terminalSection} ${styles.componentWrapper}`}
            onClick={() => openModal('TERMINAL', <Terminal />)}
          >
            <Terminal />
          </div>

          <div 
            className={`${styles.dataSection} ${styles.componentWrapper}`}
            onClick={() => openModal('DATA STREAM', <DataStream />)}
          >
            <DataStream />
          </div>

          <div 
            className={`${styles.statsSection} ${styles.componentWrapper}`}
            onClick={() => openModal('SYSTEM STATS', <SystemStats />)}
          >
            <SystemStats />
          </div>

          <div 
            className={`${styles.mapSection} ${styles.componentWrapper}`}
            onClick={() => openModal('NETWORK MAP', <NetworkMap />)}
          >
            <NetworkMap />
          </div>

          <div 
            className={`${styles.threatSection} ${styles.componentWrapper}`}
            onClick={() => openModal('THREAT MONITOR', <ThreatMonitor />)}
          >
            <ThreatMonitor />
          </div>

          <div 
            className={`${styles.packetSection} ${styles.componentWrapper}`}
            onClick={() => openModal('PACKET SNIFFER', <PacketSniffer />)}
          >
            <PacketSniffer />
          </div>

          <div 
            className={`${styles.ipSection} ${styles.componentWrapper}`}
            onClick={() => openModal('IP TRACKER', <IPTracker />)}
          >
            <IPTracker />
          </div>

          <div 
            className={`${styles.portSection} ${styles.componentWrapper}`}
            onClick={() => openModal('PORT SCANNER', <PortScanner />)}
          >
            <PortScanner />
          </div>

          <div 
            className={`${styles.cryptoSection} ${styles.componentWrapper}`}
            onClick={() => openModal('CRYPTO HASH GENERATOR', <CryptoMonitor />)}
          >
            <CryptoMonitor />
          </div>
        </div>

        {modalContent && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <div className={styles.modalTitle}>{modalContent.title}</div>
                <button className={styles.modalClose} onClick={closeModal}>
                  ×
                </button>
              </div>
              <div className={styles.modalBody}>
                {modalContent.component}
              </div>
            </div>
          </div>
        )}

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
