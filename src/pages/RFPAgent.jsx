import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Sparkles, Download, Upload, FileText, ChevronRight, Edit3 } from 'lucide-react';
import { callAI, SYSTEM_PROMPTS, generateTenderId } from '../lib/ai';
import ReactMarkdown from 'react-markdown';

const SUGGESTIONS = [
  'IT Hardware — Desktops',
  'Cloud Infrastructure',
  'Office Furniture',
  'Security Systems',
  'Consulting Services',
];

export default function RFPAgent() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Welcome! I'm your AI procurement assistant. I'll help you create a **GeM-compliant tender document** in minutes.\n\nJust tell me — **what do you need to procure?**\n\nI'll ask you a few questions and then generate a complete RFP with scoring matrix, eligibility criteria, and MSME clauses.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rfpGenerated, setRfpGenerated] = useState(null);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim() || loading) return;
    setError(null);
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPTS.rfpAgent },
        ...newMessages.map((m) => ({ role: m.role, content: m.content })),
      ];

      // Check if enough context to generate RFP
      const userMsgCount = newMessages.filter(m => m.role === 'user').length;
      if (userMsgCount >= 2) {
        apiMessages.push({
          role: 'user',
          content: 'Based on all the information provided, now generate a complete GeM-format RFP tender document. Include all sections: title, scope, eligibility criteria, scoring matrix with weights, MSME clauses, EMD details, and submission guidelines. Format it nicely with markdown headers and sections.',
        });
      }

      const response = await callAI({
        messages: apiMessages,
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        temperature: 0.7,
        max_tokens: 4096,
      });

      const aiMsg = { role: 'assistant', content: response };
      setMessages([...newMessages, aiMsg]);

      // If response looks like an RFP (has headers and structured content), show preview
      if (response.includes('##') || response.includes('Scope') || response.includes('Eligibility')) {
        setRfpGenerated({
          id: generateTenderId(),
          content: response,
          generatedAt: new Date().toISOString(),
        });
      }
    } catch (err) {
      setError(err.message);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `I encountered an error: **${err.message}**\n\nPlease make sure your Groq API key is configured in Netlify environment variables. You can get a free key at [console.groq.com](https://console.groq.com).`,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-4 animate-slide-up">
      {/* Chat Panel */}
      <div className="flex flex-col w-full lg:w-[45%] card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
          <span className="text-xs font-medium text-gray-700">AI procurement assistant</span>
          <span className="text-[10px] text-gray-400 ml-auto">Powered by Llama 4 Scout · Groq</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`animate-slide-up ${msg.role === 'user' ? 'flex justify-end' : ''}`}
            >
              <div
                className={`max-w-[90%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-700 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                      li: ({ children }) => <li>{children}</li>,
                      h1: ({ children }) => <h3 className="font-semibold text-base mt-3 mb-1">{children}</h3>,
                      h2: ({ children }) => <h3 className="font-semibold text-sm mt-3 mb-1">{children}</h3>,
                      h3: ({ children }) => <h4 className="font-semibold text-sm mt-2 mb-1">{children}</h4>,
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-gray-400 text-sm animate-slide-up">
              <Loader2 className="w-4 h-4 animate-spin" />
              Drafting response...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 px-4 py-2 border-t border-gray-100 bg-gray-50/30">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(`We need to procure ${s.toLowerCase()} for our ministry offices.`)}
                className="px-3 py-1.5 rounded-full border border-gray-200 text-xs text-gray-600 hover:bg-white hover:border-gray-300 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex items-center gap-2 p-3 border-t border-gray-100">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Describe your procurement need..."
            className="input-field !rounded-full !py-2.5 !text-sm"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 disabled:opacity-40 transition-colors flex-shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="hidden lg:flex flex-col flex-1 card overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-700">
            <FileText className="w-3.5 h-3.5" />
            Live RFP preview
          </div>
          {rfpGenerated && (
            <div className="flex items-center gap-2">
              <button className="btn-secondary !py-1.5 !px-3 !text-xs">
                <Download className="w-3 h-3" /> Export PDF
              </button>
              <button className="btn-primary !py-1.5 !px-3 !text-xs">
                <Upload className="w-3 h-3" /> Publish
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6 chat-scroll">
          {rfpGenerated ? (
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="text-center mb-6 pb-4 border-b border-gray-100">
                <div className="text-[10px] text-gray-400 tracking-widest uppercase">Government of India</div>
                <div className="text-[10px] text-gray-400 mb-2">Ministry of Defence</div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-medium border border-green-200">
                  <Sparkles className="w-3 h-3" /> GeM Compliant
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">Tender ID: {rfpGenerated.id}</div>
              <div className="prose prose-sm max-w-none text-sm leading-relaxed text-gray-700">
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => <h2 className="text-base font-semibold text-gray-900 mt-6 mb-2 pb-1 border-b border-gray-100">{children}</h2>,
                    h2: ({ children }) => <h3 className="text-sm font-semibold text-blue-800 mt-5 mb-2 flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5" />{children}</h3>,
                    h3: ({ children }) => <h4 className="text-sm font-medium text-gray-800 mt-3 mb-1">{children}</h4>,
                    p: ({ children }) => <p className="text-sm text-gray-600 mb-2 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="text-sm text-gray-600 list-disc pl-5 mb-3 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="text-sm text-gray-600 list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
                    table: ({ children }) => <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden my-3">{children}</table>,
                    th: ({ children }) => <th className="bg-gray-50 px-3 py-2 text-left font-medium text-gray-700 border-b border-gray-200">{children}</th>,
                    td: ({ children }) => <td className="px-3 py-2 border-b border-gray-100 text-gray-600">{children}</td>,
                    strong: ({ children }) => <strong className="font-semibold text-gray-800">{children}</strong>,
                  }}
                >
                  {rfpGenerated.content}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-gray-400" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">RFP preview will appear here</h3>
              <p className="text-xs text-gray-400 max-w-[240px]">
                Start chatting with the AI to generate a GeM-compliant tender document. It updates live as you provide details.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
