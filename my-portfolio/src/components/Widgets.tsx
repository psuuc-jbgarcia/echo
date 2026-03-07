import { useState, useEffect } from 'react';
import './Widgets.css';

const MOCK_COMMITS = [
  "feat: add drag and drop support",
  "fix: context menu positioning",
  "style: update terminal colors",
  "refactor: extract desktop icon component",
  "docs: update README",
  "chore: bump dependencies",
  "perf: optimize mesh gradient rendering"
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

const LOG_MESSAGES = [
  "System update complete...",
  "Connection secure (TLS 1.3)",
  "Dependencies cached.",
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
