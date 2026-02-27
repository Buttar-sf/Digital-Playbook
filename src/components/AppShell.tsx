import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home, FileText, Rocket, FolderOpen, BookOpen,
  Map, MessageSquare, ShieldCheck, Settings, Search,
  Bell, Layers, ClipboardList
} from 'lucide-react';
import './AppShell.css';
import './UI.css';

const navItems = [
  { to: '/', icon: Home, label: 'Accueil' },
  { to: '/offres', icon: FileText, label: 'Offres (AO)' },
  { to: '/projets', icon: Rocket, label: 'Démarrage de projet', children: [
    { to: '/projets/ecd', icon: FolderOpen, label: 'ECD / CDE' },
    { to: '/projets/bep', icon: BookOpen, label: 'BEP' },
    { to: '/projets/tidp', icon: ClipboardList, label: 'Plans d\'information' },
    { to: '/projets/sig', icon: Map, label: 'SIG' },
  ]},
  { to: '/qr', icon: MessageSquare, label: 'Q/R' },
  { to: '/qualite', icon: ShieldCheck, label: 'Qualité' },
  { to: '/parametres', icon: Settings, label: 'Paramètres' },
];

export default function AppShell() {
  const location = useLocation();
  const isProjetSection = location.pathname.startsWith('/projets');

  return (
    <div className="app-shell">
      <aside className="sidebar" role="navigation" aria-label="Navigation principale">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon"><Layers size={16} /></div>
          <h2>Egis Digital<br/>Standards Assistant</h2>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => (
            <div key={item.to}>
              <NavLink
                to={item.to}
                end={!item.children}
                className={({ isActive }) =>
                  `sidebar-link${isActive && !item.children ? ' active' : ''}${item.children && isProjetSection ? ' active' : ''}`
                }
              >
                <item.icon className="icon" size={20} />
                {item.label}
              </NavLink>
              {item.children && isProjetSection && (
                item.children.map(sub => (
                  <NavLink
                    key={sub.to}
                    to={sub.to}
                    className={({ isActive }) => `sidebar-link sidebar-sub-link${isActive ? ' active' : ''}`}
                  >
                    <sub.icon className="icon" size={16} />
                    {sub.label}
                  </NavLink>
                ))
              )}
            </div>
          ))}
        </nav>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-search">
              <Search size={16} color="var(--color-gray-400)" />
              <input type="text" placeholder="Rechercher projets, livrables, personnes…" aria-label="Recherche globale" />
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn btn-ghost btn-icon" aria-label="Notifications">
              <Bell size={18} />
            </button>
            <div className="topbar-user">
              <div className="topbar-avatar">MD</div>
              <div className="topbar-user-info">
                <span className="topbar-user-name">Marie Dupont</span>
                <span className="topbar-user-role">BIM Manager</span>
              </div>
            </div>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
