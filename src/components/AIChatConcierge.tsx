import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const QUICK_PROMPTS = [
  '3 BHK Pricing & Carpet Area',
  'Sports Academies & Coaching',
  'Location & Hinjewadi Distance',
  'MahaRERA & Bank Loans',
  'Book VIP Site Visit'
];

export default function AIChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste! I am your AI Property Concierge for Goel Ganga Legend County, Bavdhan. How can I assist you with pricing, floor plans, or our 12.5-acre sports academies today?',
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (userText: string) => {
    const query = userText.trim();
    if (!query || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    if (typeof window !== 'undefined' && typeof (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag === 'function') {
      try {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('event', 'chat_with_ai', {
          event_category: 'AI Concierge',
          event_label: query,
        });
      } catch {
        // Analytics non-blocking
      }
    }

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4).map(m => ({
            role: m.sender === 'ai' ? 'assistant' : 'user',
            content: m.text
          }))
        })
      });

      const data = await res.json() as { success: boolean; reply?: string; error?: string };

      const replyText = data.success && data.reply 
        ? data.reply 
        : "Goel Ganga Legend County in Bavdhan offers luxury 3 BHK flats starting at ₹1.77 Cr* with world-class sports academies. Would you like to schedule a site visit or download the brochure?";

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallbackMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Goel Ganga Legend County Bavdhan features luxury 3 & 3.5 BHK residences near Chandni Chowk (MahaRERA: P52100054578). Connect with our sales desk on WhatsApp or book an exclusive site visit!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 text-white px-4 py-3 rounded-full shadow-2xl border border-amber-500/50 hover:border-amber-400 transition-all group shadow-amber-500/20"
          aria-label="Open AI Property Concierge"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <span className="text-xs font-bold tracking-wider uppercase text-amber-100">AI Concierge</span>
        </motion.button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-28 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-lg bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950 p-4 border-b border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    Legend County AI
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Edge GPU</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-amber-400" /> MahaRERA: P52100054578
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Conversation Window */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-amber-600 text-white rounded-tr-none'
                        : 'bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-tl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                    <span className="block text-[9px] opacity-60 mt-1 text-right">{m.time}</span>
                  </div>
                  {m.sender === 'user' && (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex gap-2.5 items-center text-slate-400">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-slate-800/90 rounded-2xl p-3 rounded-tl-none border border-slate-700/60 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 scrollbar-none">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap bg-slate-800/80 hover:bg-amber-600/30 text-amber-300 hover:text-amber-200 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-medium transition flex items-center gap-1 shrink-0"
                >
                  {prompt}
                  <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about 3 BHK price, academies, site visit..."
                className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white p-2 rounded-xl transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
