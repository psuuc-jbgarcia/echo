import { useState, useEffect } from 'react';
import './Widgets.css';

export function resolveCount(raw: string | null): number {
  const parsed = parseInt(raw ?? '', 10);
  return isNaN(parsed) ? 1 : parsed;
}

const MOCK_COMMITS = [
  "jerico: fixed a bug, created 3 more",
  "jerico: is that a typo? yes it is",
  "jerico: taking a lunch break (BRB 🌮)",
  "jerico: coding with coffee ☕",
  "jerico: refactoring for the 100th time",
  "jerico: searching for that missing semicolon",
  "jerico: googling how to center a div... again",
  "jerico: deploying to production on a Friday 🚀",
  "jerico: why is this part working? don't touch it",
  "jerico: coffee.exe has stopped working",
  "jerico: trying to explain code to my rubber duck"
];

export const LiveGitFeed = () => {
  const [commits, setCommits] = useState<string[]>([]);

  useEffect(() => {
    setCommits(MOCK_COMMITS.slice(0, 3));

    const interval = setInterval(() => {
      const randomCommit = MOCK_COMMITS[Math.floor(Math.random() * MOCK_COMMITS.length)];
      setCommits(prev => {
        const next = [randomCommit, ...prev];
        if (next.length > 5) return next.slice(0, 5);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget-git-feed glass">
      <div className="widget-header">Live Git Commits</div>
      <div className="widget-content">
        {commits.map((commit, i) => (
          <div key={i} className="commit-item">
            <span className="commit-hash">{Math.random().toString(16).substring(2, 9)}</span>
            <span className="commit-msg">{commit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const STORAGE_KEY = 'visitorCount';
const SESSION_KEY = 'visited';

export const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    try {
      const alreadyVisited = sessionStorage.getItem(SESSION_KEY);
      const raw = localStorage.getItem(STORAGE_KEY);
      const current = resolveCount(raw);

      if (!alreadyVisited) {
        const next = current + 1;
        try { localStorage.setItem(STORAGE_KEY, String(next)); } catch {}
        try { sessionStorage.setItem(SESSION_KEY, '1'); } catch {}
        setCount(next);
      } else {
        setCount(current);
      }
    } catch {
      setCount(1);
    }
  }, []);

  return (
    <div className="widget-visitor-counter widget-git-feed glass">
      <div className="widget-header">Visitor Count</div>
      <div className="widget-content">
        <span className="commit-msg">Total visits: {count}</span>
      </div>
    </div>
  );
};

const LOG_MESSAGES = [
  "System update complete...",
  "Connection secure (TLS 1.3)",
  "Searching for that one missing semicolon...",
  "Googling how to center a div...",
  "Thinking about snacks...",
  "Running on coffee and sheer willpower.",
  "AI: Jerico is definitely not a robot.",
  "Memory usage normal (45%)",
  "Network scan clear.",
  "Background processes synced.",
  "Workspace state saved."
];

export const SystemLogs = () => {
  const [log, setLog] = useState(LOG_MESSAGES[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLog(LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="widget-system-log">
      {'>'} {log}
    </div>
  );
};
