import React, { useState, useRef, useEffect } from 'react';
import './Terminal.css';

interface Line {
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'blank';
  content: string | React.ReactNode;
}

const BOOT_LINES: Line[] = [
  { type: 'info', content: 'JericoOS v1.0.0 — Portfolio Shell' },
  { type: 'info', content: 'Type `help` to see available commands.' },
  { type: 'blank', content: '' },
  { type: 'output', content: '👋 Welcome! I\'m Jerico B. Garcia — Developer & IT Instructor.' },
  { type: 'blank', content: '' },
];

const COMMANDS: Record<string, (args: string[]) => Line[]> = {
  help: () => [
    { type: 'info', content: '╔══════════════════════════════════════╗' },
    { type: 'info', content: '║         Available Commands           ║' },
    { type: 'info', content: '╚══════════════════════════════════════╝' },
    { type: 'output', content: '  whoami          — Who am I?' },
    { type: 'output', content: '  about           — About me' },
    { type: 'output', content: '  skills          — My tech skills' },
    { type: 'output', content: '  projects        — My projects' },
    { type: 'output', content: '  contact         — Contact info' },
    { type: 'output', content: '  experience      — Work experience' },
    { type: 'output', content: '  certifications  — View my certificates' },
    { type: 'output', content: '  scan network    — Network scanner' },
    { type: 'output', content: '  sudo hire-me    — *wink wink*' },
    { type: 'output', content: '  clear           — Clear the terminal' },
    { type: 'blank', content: '' },
  ],

  whoami: () => [
    { type: 'success', content: 'Jerico B. Garcia' },
    { type: 'output', content: 'BSIT Graduate | Mobile & Web Developer | IT Instructor' },
    { type: 'output', content: 'Universidad de Dagupan' },
    { type: 'blank', content: '' },
  ],

  about: () => [
    { type: 'info', content: '$ cat about_me.txt' },
    { type: 'blank', content: '' },
    { type: 'output', content: '┌──────────────────────────────────────────────────────────┐' },
    { type: 'output', content: '│  Name:     Jerico B. Garcia                              │' },
    { type: 'output', content: '│  Role:     Developer & IT Instructor                     │' },
    { type: 'output', content: '│  Edu (1):  Master in IT - Universidad de Dagupan         │' },
    { type: 'output', content: '│  Edu (2):  BSIT (Web & Mobile) - PSU Urdaneta City       │' },
    { type: 'output', content: '├──────────────────────────────────────────────────────────┤' },
    { type: 'output', content: '│  Summary:                                                │' },
    { type: 'output', content: '│  Aspiring Web and Mobile Developer. BSIT Graduate        │' },
    { type: 'output', content: '│  (Web & Mobile) PSU Urdaneta. MIT Candidate at UdD       │' },
    { type: 'output', content: '│  Passionate about building user-friendly apps.           │' },
    { type: 'output', content: '└──────────────────────────────────────────────────────────┘' },
    { type: 'blank', content: '' },
  ],

  skills: () => [
    { type: 'info', content: '$ skills --list' },
    { type: 'blank', content: '' },
    { type: 'success', content: '🚀 TECH SKILLS:' },
    { type: 'output', content: '   Web: React, PHP, Laravel, HTML, CSS, JS, Tailwind CSS, Bootstrap, Node.js' },
    { type: 'output', content: '   Mobile: Dart, Flutter, Firebase' },
    { type: 'output', content: '   Programming: Java, Java GUI, C++, Python Flask, MongoDB' },
    { type: 'output', content: '   Tools: Figma, WordPress, Postman, Gemini AI, Antigravity, Kiro, Docker' },
    { type: 'blank', content: '' },
  ],

  projects: () => [
    { type: 'info', content: '$ ls ~/projects/' },
    { type: 'blank', content: '' },
    { type: 'output', content: '1. 🌐 First Ever Website [Static Website]' },
    { type: 'output', content: '      └─ HTML, CSS, JavaScript' },
    { type: 'blank', content: '' },
    { type: 'output', content: '2. 🤖 AI-Powered Essay Evaluation & Scoring System for Teachers [Web Application]' },
    { type: 'output', content: '      └─ React, Node.js, MongoDB, Gemini AI, PWA, Tailwind CSS, Docker' },
    { type: 'blank', content: '' },
    { type: 'output', content: '3. 🚗 Smart Parking Management System with Plate Number Recognition [Mobile & Web App]' },
    { type: 'output', content: '      └─ Firebase, Python, YOLO, Flask, Computer Vision' },
    { type: 'blank', content: '' },
    { type: 'output', content: '4. 📋 Santa Maria Barangay Document Request System with Customer Support Chatbot [Web Application]' },
    { type: 'output', content: '      └─ PHP, HTML, CSS, MySQL, Bootstrap' },
    { type: 'blank', content: '' },
    { type: 'output', content: '5. 🍳 Recipe System with Customer Support Chatbot [Web Application]' },
    { type: 'output', content: '      └─ PHP, MySQL, Bootstrap' },
    { type: 'blank', content: '' },
    { type: 'output', content: '6. 📱 Recipe App [Mobile Application]' },
    { type: 'output', content: '      └─ Flutter, Firebase, API Integration' },
    { type: 'blank', content: '' },
    { type: 'output', content: '7. 📦 Simple Inventory Management [Web Application]' },
    { type: 'output', content: '      └─ Node.js, Express, MySQL, EJS' },
    { type: 'blank', content: '' },
    { type: 'output', content: '8. 📱 Quiz App [Mobile Application]' },
    { type: 'output', content: '      └─ Flutter, Firebase' },
    { type: 'blank', content: '' },
  ],

  contact: () => [
    { type: 'info', content: '$ cat contact.json' },
    { type: 'blank', content: '' },
    { type: 'output', content: '{' },
    { type: 'success', content: '  "email":    "jbgarcia@psuuc.edu.ph",' },
    { type: 'success', content: '  "github":   "github.com/psuuc-jbgarcia",' },
    { type: 'success', content: '  "linkedin": "linkedin.com/in/jbgarcia"' },
    { type: 'output', content: '}' },
    { type: 'blank', content: '' },
  ],

  experience: () => [
    { type: 'info', content: '$ cat experience.log' },
    { type: 'blank', content: '' },
    { type: 'success', content: '[July 2025 - Present] IT Instructor ● Current' },
    { type: 'output', content: '  Universidad de Dagupan' },
    { type: 'blank', content: '' },
  ],

  certifications: () => [
    { type: 'info', content: '$ ls ~/certifications/' },
    { type: 'blank', content: '' },
    { type: 'success', content: '📜 1. Laravel (Ranking in the Top 10%)' },
    { type: 'output', content: '      └─ Issuer: TestDome' },
    { type: 'output', content: '      └─ Date: May 23, 2024' },
    { type: 'blank', content: '' },
    { type: 'success', content: '📜 2. TOPCIT Certificate Level 2' },
    { type: 'output', content: '      └─ Score: 313/1000' },
    { type: 'output', content: '      └─ Issuer: Institute for Information & Communications Technology Promotion' },
    { type: 'output', content: '      └─ Date: August 24, 2025' },
    { type: 'blank', content: '' },
  ],

  'scan network': () => [
    { type: 'info', content: '$ nmap -sP 192.168.1.0/24' },
    { type: 'blank', content: '' },
    { type: 'output', content: 'Starting Nmap 7.94 ( https://nmap.org )' },
    { type: 'output', content: 'Scanning network range 192.168.1.0/24...' },
    { type: 'blank', content: '' },
    { type: 'success', content: 'Host is up:  192.168.1.1    — Router (Gateway)' },
    { type: 'success', content: 'Host is up:  192.168.1.5    — Laptop-K1 [YOU]' },
    { type: 'success', content: 'Host is up:  192.168.1.7    — IoT Device (Camera)' },
    { type: 'success', content: 'Host is up:  192.168.1.12   — Smart TV' },
    { type: 'success', content: 'Host is up:  192.168.1.20   — Unknown Device 🤔' },
    { type: 'blank', content: '' },
    { type: 'info', content: '5 hosts up — Nmap done.' },
    { type: 'blank', content: '' },
  ],

  'sudo hire-me': () => [
    { type: 'info', content: '$ sudo hire-me' },
    { type: 'blank', content: '' },
    { type: 'output', content: '[sudo] password for jerico: ************' },
    { type: 'blank', content: '' },
    { type: 'success', content: '✅ Authentication successful.' },
    { type: 'success', content: '✅ Credentials verified.' },
    { type: 'success', content: '✅ Portfolio reviewed.' },
    { type: 'blank', content: '' },
    { type: 'success', content: '🎉 ACCESS GRANTED. Welcome to the team!' },
    { type: 'success', content: '📧 Offer letter sent to: jbgarcia@psuuc.edu.ph' },
    { type: 'blank', content: '' },
    { type: 'info', content: '   Best decision you\'ve made today. 😄' },
    { type: 'blank', content: '' },
  ],

  hack: () => [
    { type: 'info', content: '$ initiating hack sequence...' },
    { type: 'blank', content: '' },
    { type: 'error', content: 'ERROR: ethics.module loaded — hacking disabled.' },
    { type: 'output', content: 'Nice try. I only use my powers for good. 😎' },
    { type: 'blank', content: '' },
  ],
};

const TerminalApp: React.FC = () => {
  const [lines, setLines] = useState<Line[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const inputLine: Line = {
      type: 'input',
      content: `jerico@portfolio:~$ ${input}`,
    };

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      setHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
      return;
    }

    const handler = COMMANDS[cmd];
    const outputLines: Line[] = handler
      ? handler(cmd.split(' ').slice(1))
      : [
          { type: 'error', content: `bash: ${cmd}: command not found` },
          { type: 'output', content: "Type 'help' for available commands." },
          { type: 'blank', content: '' },
        ];

    setLines(prev => [...prev, inputLine, ...outputLines]);
    setHistory(prev => [input, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? '' : history[newIndex]);
    }
  };

  return (
    <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-output" ref={outputRef}>
        {lines.map((line, i) => (
          <div key={i} className={`term-line term-${line.type}`}>
            {line.type === 'blank' ? '\u00A0' : line.content}
          </div>
        ))}
      </div>
      <form className="terminal-input-row" onSubmit={handleSubmit}>
        <span className="terminal-prompt">
          <span className="prompt-user">jerico@portfolio</span>
          <span className="prompt-sep">:</span>
          <span className="prompt-dir">~</span>
          <span className="prompt-dollar">$</span>
        </span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
};

export default TerminalApp;
