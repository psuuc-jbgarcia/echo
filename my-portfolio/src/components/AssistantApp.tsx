import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Command } from 'lucide-react';
import './AssistantApp.css';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  isBootSeq?: boolean;
}

const SYSTEM_PROMPT = `You are E.C.H.O, the digital assistant for Jerico B. Garcia's portfolio operating system. 
Jerico is a Full-Stack Web & Mobile Developer and an IT Instructor at Universidad de Dagupan. He holds a BSIT and is currently an MIT Candidate.
His skills include React, Node.js, Next.js, and Mobile Development (Flutter/React Native).
Your tone should be helpful, slightly futuristic, professional, and concise. 
If the user asks who you are, introduce yourself as E.C.H.O.`;

const AssistantApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout1: ReturnType<typeof setTimeout>;
    let timeout2: ReturnType<typeof setTimeout>;

    if (messages.length === 0) {
      setMessages([{ id: 'boot1', sender: 'ai', text: 'E.C.H.O Protocol Initializing...', isBootSeq: true }]);
      
      timeout1 = setTimeout(() => {
        setMessages(prev => [...prev, { id: 'boot2', sender: 'ai', text: 'System Online. Security clearance accepted.', isBootSeq: true }]);
        
        timeout2 = setTimeout(() => {
          setMessages(prev => [...prev, { 
            id: 'boot3', 
            sender: 'ai', 
            text: 'Greetings. I am E.C.H.O, the digital assistant for this operating system. How can I assist you with information regarding Jerico B. Garcia?' 
          }]);
        }, 800);
      }, 1000);
    }
    return () => { clearTimeout(timeout1); clearTimeout(timeout2); };
  }, [messages.length]);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const generateResponse = async (text: string) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      return "ERROR: Gemini API Key not found. Please add VITE_GEMINI_API_KEY to your .env file.";
    }

    try {
      // Use user's previous messages for context
      const chatHistory = messages.filter(m => !m.isBootSeq).map(m => ({
        role: m.sender === 'ai' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const payload = {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [...chatHistory, { role: 'user', parts: [{ text }] }],
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      
      return data.candidates[0].content.parts[0].text;
    } catch (err: any) {
      console.error(err);
      return "Network protocol failure. Could not connect to Gemini reasoning engine.";
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const aiResponseText = await generateResponse(userMsg.text);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText }]);
    setIsTyping(false);
  };

  const handleQuickCommand = async (cmd: string) => {
    setInput('');
    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text: cmd };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    
    const aiResponseText = await generateResponse(cmd);
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText }]);
    setIsTyping(false);
  };

  return (
    <div className="assistant-app">
      <div className="assistant-header">
        <Bot size={20} className="assistant-icon" />
        <span className="assistant-title">E.C.H.O Protocol v1.4</span>
        <span className="assistant-status"></span>
      </div>

      <div className="assistant-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
            <div className="message-bubble">
              {msg.sender === 'ai' && !msg.isBootSeq && <Bot size={14} className="message-avatar" />}
              {msg.sender === 'user' && <User size={14} className="message-avatar" />}
              <div className={`message-text ${msg.isBootSeq ? 'boot-seq' : ''}`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message-wrapper ai typing">
            <div className="message-bubble">
              <Bot size={14} className="message-avatar" />
              <div className="typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="assistant-quick-actions">
        <button onClick={() => handleQuickCommand('Who is Jerico?')}><Command size={12}/> Who is Jerico?</button>
        <button onClick={() => handleQuickCommand('Tech Skills')}><Command size={12}/> Tech Skills</button>
        <button onClick={() => handleQuickCommand('Contact Details')}><Command size={12}/> Contact Info</button>
      </div>

      <form className="assistant-input-area" onSubmit={handleSend}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Query E.C.H.O network..."
          className="assistant-input"
        />
        <button type="submit" className="assistant-send-btn" disabled={!input.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default AssistantApp;
