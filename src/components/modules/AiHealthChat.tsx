import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Trash2,
  Copy,
  Check,
  AlertTriangle,
  PhoneCall,
  Info,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { MedicalDisclaimer } from '../common/MedicalDisclaimer';

interface AiHealthChatProps {
  onNavigateToEmergency: () => void;
}

const SUGGESTED_PROMPTS = [
  'What are common causes of tension headaches?',
  'How can I improve my sleep quality naturally?',
  'What foods are rich in iron for a balanced diet?',
  'What are the most common symptoms of dehydration?',
  'How can I maintain healthy blood pressure levels?',
  'What should I know about safe paracetamol usage?'
];

export const AiHealthChat: React.FC<AiHealthChatProps> = ({ onNavigateToEmergency }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('aura_chat_session');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'welcome',
        role: 'model',
        text: `Hello! I am AuraHealth’s AI Educational Wellness Assistant.

I can help answer general questions about health, nutrition, wellness practices, common symptoms, and medication guidelines.

**Important Notice**: I provide general educational information only. I cannot diagnose conditions, prescribe treatments, or replace the clinical judgment of a licensed healthcare provider. If you are experiencing urgent symptoms, please select **Emergency Guidance** or contact your local emergency services right away.

What health or wellness question can I assist you with today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [detectedEmergency, setDetectedEmergency] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      sessionStorage.setItem('aura_chat_session', JSON.stringify(messages));
    } catch {
      // ignore
    }
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    try {
      const pending = sessionStorage.getItem('aura_pending_query');
      if (pending) {
        sessionStorage.removeItem('aura_pending_query');
        handleSend(pending);
      }
    } catch {
      // ignore
    }
  }, []);

  const checkClientEmergencyKeywords = (text: string) => {
    const pattern = /\b(chest pain|heart attack|can't breathe|cannot breathe|severe breathing|stroke|slurred speech|facial drooping|suicid|kill myself|anaphylaxis|throat swelling|heavy bleeding|passed out|loss of consciousness)\b/i;
    return pattern.test(text);
  };

  const handleSend = async (userPromptText?: string) => {
    const textToSend = userPromptText || input.trim();
    if (!textToSend || loading) return;

    setError(null);
    const userMsgId = 'u-' + Date.now();
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const isEmergency = checkClientEmergencyKeywords(textToSend);
    if (isEmergency) {
      setDetectedEmergency(true);
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/health-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.map((m) => ({ role: m.role, text: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: Unable to complete AI query.`);
      }

      const data = await response.json();

      if (data.emergencyFlag) {
        setDetectedEmergency(true);
      }

      const modelMessage: ChatMessage = {
        id: 'm-' + Date.now(),
        role: 'model',
        text: data.reply || 'No response returned. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergencyNotice: data.emergencyFlag || isEmergency
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(
        'We encountered an issue connecting with the AI health service. Please verify your connection or try again shortly.'
      );
      // Add local educational fallback so the conversation is never broken
      const fallbackMsg: ChatMessage = {
        id: 'm-err-' + Date.now(),
        role: 'model',
        text: `*Notice: The AI response service is temporarily offline or experiencing high traffic.*

**General Educational Note**:
For questions regarding "${textToSend.slice(0, 50)}...":
- Health symptoms can stem from varied nutritional, environmental, or medical factors.
- Always consult a physician or pharmacist if symptoms are persistent, worsening, or distressing.
- If you suspect an emergency, please dial 911, 999, 112, or your local emergency line immediately.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    sessionStorage.removeItem('aura_chat_session');
    setDetectedEmergency(false);
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        text: 'Conversation cleared. How can I help you explore general health, nutrition, or wellness education today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* Header Info */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
              <Sparkles className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Health Assistant</h1>
            <span className="text-slate-400 text-xs font-medium">· Gemini 3.8 Flash</span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Ask wellness, nutrition, symptom concepts, and medication questions in plain language.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClearChat}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            title="Clear current session messages"
          >
            <Trash2 className="h-4 w-4 text-slate-400" />
            Clear Chat
          </button>
        </div>
      </div>

      {/* Reusable Disclaimer Component */}
      <MedicalDisclaimer type="ai_qa" className="mb-6" />

      {/* Emergency Alert Banner if Emergency Keywords Detected */}
      {detectedEmergency && (
        <div
          role="alert"
          className="mb-6 rounded-2xl bg-rose-600 p-5 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-white/20 p-2 shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold">POTENTIAL EMERGENCY DETECTED</h3>
              <p className="mt-1 text-xs text-rose-100 leading-relaxed max-w-2xl">
                Your message suggests acute symptoms (such as chest pain, severe shortness of breath, stroke signs, or severe distress). Please do not wait for AI replies. Call emergency medical responders immediately.
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToEmergency}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-50 shadow-xs cursor-pointer"
          >
            <PhoneCall className="h-4 w-4 text-rose-600" />
            Emergency Guide & Numbers
          </button>
        </div>
      )}

      {/* Chat Container */}
      <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {/* Messages List */}
        <div
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-[420px] max-h-[580px] bg-slate-50/50"
          role="log"
          aria-live="polite"
        >
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white shadow-xs">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`relative max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-teal-700 text-white rounded-br-xs'
                      : msg.isEmergencyNotice
                      ? 'bg-rose-50 border border-rose-200 text-slate-900 rounded-bl-xs'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <div className="whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>

                  <div
                    className={`mt-2.5 flex items-center justify-between text-[10px] ${
                      isUser ? 'text-teal-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>

                    {!isUser && (
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
                    You
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-slate-500 text-xs">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-bl-xs border border-slate-200 bg-white px-4 py-3 shadow-2xs flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-600" />
                <span className="text-slate-600 font-medium">AuraHealth is analyzing evidence-based wellness guidance...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggested Queries */}
        <div className="border-t border-slate-100 bg-white px-4 py-3">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold mb-2">
            <HelpCircle className="h-3.5 w-3.5 text-teal-600" />
            <span>Suggested Wellness Questions:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {SUGGESTED_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                disabled={loading}
                className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200 bg-slate-50/70 p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2"
          >
            <div className="relative flex-1">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask about symptoms, healthy nutrition, sleep, medication guidelines..."
                className="w-full resize-none rounded-xl border border-slate-300 bg-white p-3 pr-10 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-teal-700 focus:outline-hidden focus:ring-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Send message"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline mr-1">Ask</span>
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span className="hidden sm:inline">Press Enter to send, Shift+Enter for new line</span>
            <span className="inline-flex items-center gap-1 text-slate-400">
              <ShieldCheck className="h-3 w-3 text-emerald-500" />
              Stateless Session (Not stored on any remote server)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
