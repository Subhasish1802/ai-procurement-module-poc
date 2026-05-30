import { FileText, Clock, CheckCircle2, Zap, Plus, Eye, Download, ArrowUpRight, TrendingUp, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sampleTenders, activityLog } from '../lib/sampleData';

const statusConfig = {
  evaluating: { label: 'Evaluating', class: 'bg-amber-50 text-amber-700 border border-amber-200' },
  open: { label: 'Bids Open', class: 'bg-blue-50 text-blue-700 border border-blue-200' },
  completed: { label: 'Completed', class: 'bg-green-50 text-green-700 border border-green-200' },
  draft: { label: 'Draft', class: 'bg-gray-100 text-gray-600 border border-gray-200' },
};

const activityColors = {
  success: 'bg-green-500',
  info: 'bg-blue-500',
  warning: 'bg-amber-500',
  purple: 'bg-purple-500',
};

export default function Dashboard() {
  const stats = [
    { label: 'Active tenders', value: '12', sub: '3 awaiting evaluation', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { label: 'Pending evaluations', value: '7', sub: '48 bids to review', icon: Clock, color: 'text-amber-600 bg-amber-50' },
    { label: 'Completed this month', value: '23', sub: '+38% vs last month', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
    { label: 'Avg eval time', value: '2.4 hrs', sub: 'Was 8-12 weeks manual', icon: Zap, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-gray-500">{s.label}</span>
            </div>
            <div className="text-2xl font-semibold text-gray-900">{s.value}</div>
            <div className="text-[11px] text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Active Tenders Table */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">Active tenders</h2>
          <Link to="/rfp" className="btn-primary text-xs !py-1.5 !px-3">
            <Plus className="w-3.5 h-3.5" /> New tender
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-normal">Tender</th>
                <th className="text-left px-3 py-3 text-xs text-gray-500 font-normal">Status</th>
                <th className="text-center px-3 py-3 text-xs text-gray-500 font-normal">Bids</th>
                <th className="text-left px-3 py-3 text-xs text-gray-500 font-normal w-40">Progress</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleTenders.map((t) => {
                const st = statusConfig[t.status];
                return (
                  <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900 text-[13px]">{t.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{t.id} · {t.estimatedValue}</div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`badge ${st.class}`}>{st.label}</span>
                    </td>
                    <td className="text-center px-3 py-3.5 text-gray-600">{t.bidsCount || '—'}</td>
                    <td className="px-3 py-3.5">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            t.evalProgress === 100 ? 'bg-green-500' :
                            t.evalProgress > 0 ? 'bg-amber-500' : 'bg-gray-200'
                          }`}
                          style={{ width: `${t.evalProgress}%` }}
                        />
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        {t.status === 'completed' ? `L1: ${t.l1Bidder}` :
                         t.status === 'evaluating' ? `Technical: ${t.evalProgress}%` :
                         t.status === 'open' ? 'Awaiting bid close' : 'RFP in progress'}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={t.status === 'evaluating' ? '/evaluate' : '#'}
                          className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100 text-gray-500 transition-colors">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity */}
      <div className="card p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent activity</h2>
        <div className="space-y-0">
          {activityLog.map((a, i) => (
            <div key={i} className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
              <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${activityColors[a.type]}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-relaxed">{a.text}</p>
                <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
