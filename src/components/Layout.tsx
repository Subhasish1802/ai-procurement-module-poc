import { Outlet, NavLink } from 'react-router-dom'
import { LayoutDashboard, FilePlus, BarChart3, Shield, Settings, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tenders/new', icon: FilePlus, label: 'Create tender' },
  { to: '/evaluate/GEM-2026-B-4521', icon: BarChart3, label: 'Evaluations' },
  { to: '/bid/GEM-2026-B-4521', icon: Shield, label: 'Bid portal' },
]

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-brand-900 text-white flex flex-col transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center text-sm font-bold">AI</div>
          <div>
            <div className="font-semibold text-sm">ProcureAI</div>
            <div className="text-[11px] text-blue-300">Gov Procurement Platform</div>
          </div>
          <button className="ml-auto lg:hidden text-white/60" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-xs font-medium">RK</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Rajesh Kumar</div>
              <div className="text-[11px] text-blue-300">Ministry of Defence</div>
            </div>
            <Settings size={16} className="text-blue-300" />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-3 flex items-center gap-4 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-500">
            <Menu size={22} />
          </button>
          <div className="font-semibold text-sm">ProcureAI</div>
        </header>
        <div className="p-4 lg:p-8 max-w-[1400px]">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
