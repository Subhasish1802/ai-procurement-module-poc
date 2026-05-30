import { ExternalLink, Github, Zap, Server, Cpu, Globe, Shield, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-slide-up">
      {/* About */}
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">ProcureAI</h2>
            <p className="text-xs text-gray-500">AI Procurement Automation Platform for Indian Government</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          An end-to-end AI-powered platform that automates the entire Indian government procurement lifecycle — from conversational RFP generation to automated bid evaluation with explainable AI scoring, full GFR 2017 compliance, and RTI-ready audit trails.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-[11px] text-gray-500 mb-1">Version</div>
            <div className="text-sm font-medium text-gray-900">POC v1.0</div>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-[11px] text-gray-500 mb-1">Status</div>
            <div className="text-sm font-medium text-green-700 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Operational
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-600" /> Technology stack
        </h3>
        <div className="space-y-3">
          {[
            { label: 'Frontend', value: 'React 18 + Vite + Tailwind CSS', icon: Globe },
            { label: 'AI Backend', value: 'Groq API (Llama 4 Scout)', icon: Zap },
            { label: 'Deployment', value: 'Netlify (Static + Serverless Functions)', icon: Server },
            { label: 'AI Models', value: 'Llama 4 Scout 17B (Vision + Text)', icon: Cpu },
            { label: 'Cost', value: '₹0 — All free-tier APIs', icon: Shield },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <item.icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm text-gray-800 font-medium">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Setup */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-600" /> API configuration
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          This POC uses Groq's free API for AI inference. The API key is stored securely as a Netlify environment variable.
        </p>
        <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 space-y-3">
          <div className="text-sm font-medium text-blue-800">Setup instructions</div>
          <ol className="text-xs text-blue-700 space-y-2 list-decimal list-inside">
            <li>
              Get a free API key at{' '}
              <a href="https://console.groq.com" target="_blank" rel="noopener" className="underline font-medium">
                console.groq.com
              </a>{' '}
              (no credit card needed)
            </li>
            <li>In your Netlify dashboard, go to <strong>Site Settings → Environment Variables</strong></li>
            <li>Add variable: <code className="bg-blue-100 px-1.5 py-0.5 rounded text-[11px]">GROQ_API_KEY</code> = your key</li>
            <li>Redeploy the site — AI features will activate instantly</li>
          </ol>
        </div>
      </div>

      {/* Features */}
      <div className="card p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Key features demonstrated</h3>
        <div className="space-y-2">
          {[
            'Conversational RFP generation with GeM-compliant formatting',
            'AI-powered technical bid evaluation with evidence citations',
            'Multi-criteria weighted scoring engine',
            'Financial analysis and L1 bidder determination',
            'GFR 2017 / MSME / Make-in-India compliance checks',
            'RTI-ready audit trail and evaluation reports',
            'Multi-bidder submission portal with document verification',
            'Real-time evaluation dashboard and leaderboard',
          ].map((f, i) => (
            <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Market context */}
      <div className="card p-6 bg-slate-900 text-white border-slate-800">
        <h3 className="text-sm font-semibold mb-3">Market opportunity</h3>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-400">₹45-50L Cr</div>
            <div className="text-[10px] text-slate-400 mt-1">Annual Govt procurement</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-400">10L+</div>
            <div className="text-[10px] text-slate-400 mt-1">Tenders per year</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-amber-400">0</div>
            <div className="text-[10px] text-slate-400 mt-1">Competitors on eval side</div>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          No product currently automates the evaluation side of Indian government tendering. This platform targets a $1B+ SaaS opportunity with an 18-24 month first-mover window.
        </p>
      </div>
    </div>
  );
}
