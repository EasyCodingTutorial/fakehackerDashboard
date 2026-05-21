'use client';

import { useEffect, useState, useRef } from 'react';
import styles from './Terminal.module.css';

interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'success' | 'error' | 'warning';
}

const TERMINAL_COMMANDS = [
  { cmd: '> Initializing secure connection...', delay: 100 },
  { cmd: '  [OK] Connection established', delay: 800, type: 'success' },
  { cmd: '> Scanning network ports...', delay: 600 },
  { cmd: '  Port 22: OPEN', delay: 300, type: 'output' },
  { cmd: '  Port 80: OPEN', delay: 300, type: 'output' },
  { cmd: '  Port 443: OPEN', delay: 300, type: 'output' },
  { cmd: '  Port 8080: CLOSED', delay: 300, type: 'warning' },
  { cmd: '> Authenticating credentials...', delay: 1000 },
  { cmd: '  [OK] Access granted', delay: 1200, type: 'success' },
  { cmd: '> Loading system modules...', delay: 500 },
  { cmd: '  [LOAD] kernel.sys', delay: 200, type: 'output' },
  { cmd: '  [LOAD] network.dll', delay: 200, type: 'output' },
  { cmd: '  [LOAD] crypto.bin', delay: 200, type: 'output' },
  { cmd: '> Decrypting data stream...', delay: 800 },
  { cmd: '  Progress: ████████████████ 100%', delay: 1000, type: 'success' },
  { cmd: '> System ready. Awaiting commands...', delay: 500, type: 'success' },
];

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const commandIndexRef = useRef(0);

  useEffect(() => {
    const typeCommand = async () => {
      if (commandIndexRef.current >= TERMINAL_COMMANDS.length) {
        // Loop back to start
        setTimeout(() => {
          setLines([]);
          commandIndexRef.current = 0;
          typeCommand();
        }, 3000);
        return;
      }

      const command = TERMINAL_COMMANDS[commandIndexRef.current];
      setIsTyping(true);

      // Type out character by character
      for (let i = 0; i <= command.cmd.length; i++) {
        setCurrentLine(command.cmd.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 30));
      }

      // Add completed line
      setLines(prev => [...prev, {
        text: command.cmd,
        type: (command.type as any) || 'command'
      }]);
      setCurrentLine('');
      setIsTyping(false);

      // Wait before next command
      await new Promise(resolve => setTimeout(resolve, command.delay));
      commandIndexRef.current++;
      typeCommand();
    };

    typeCommand();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines, currentLine]);

  return (
    <div className={styles.terminal}>
      <div className={styles.header}>
        <div className={styles.buttons}>
          <span className={styles.close}></span>
          <span className={styles.minimize}></span>
          <span className={styles.maximize}></span>
        </div>
        <div className={styles.title}>TERMINAL v2.4.1</div>
      </div>
      <div className={styles.content} ref={terminalRef}>
        {lines.map((line, index) => (
          <div key={index} className={`${styles.line} ${styles[line.type]}`}>
            {line.text}
          </div>
        ))}
        {currentLine && (
          <div className={styles.line}>
            {currentLine}
            <span className={styles.cursor}>█</span>
          </div>
        )}
      </div>
    </div>
  );
}
