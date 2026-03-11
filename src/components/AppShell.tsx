import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Home, BookOpen, Briefcase, Rocket, MessageSquare,
  FileText, Search, Bell, ChevronDown, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import './AppShell.css';
import './UI.css';

const navSections = [
  { to: '/', icon: Home, label: 'Accueil' },
  {
    key: 'methodologies', icon: BookOpen, label: 'Méthodologies',
    children: [
      { to: '/methodologies/introduction', label: 'Introduction' },
      { to: '/methodologies/contributeurs', label: 'Liste des contributeurs' },
    ],
  },
  {
    key: 'offres', icon: Briefcase, label: 'Intégration du digital dans les offres',
    children: [
      { to: '/offres/processus', label: 'Processus d\'intégration' },
      { to: '/offres/bpmn', label: 'BPMN traitement des offres' },
      { to: '/offres/taches', label: 'Description des tâches' },
      { to: '/offres/responsabilites', label: 'Table des responsabilités' },
      { to: '/offres/tableau', label: 'Tableau des offres' },
    ],
  },
  {
    key: 'demarrage', icon: Rocket, label: 'Démarrage de projet',
    children: [
      { to: '/demarrage/bpmn', label: 'BPMN démarrage' },
      { to: '/demarrage/taches', label: 'Description des tâches' },
      { to: '/demarrage/responsabilites', label: 'Table des responsabilités QC' },
    ],
  },
  { to: '/qr', icon: MessageSquare, label: 'Questions / Réponses' },
  { to: '/documentation', icon: FileText, label: 'Documentation' },
];

export default function AppShell() {
  const location = useLocation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    methodologies: location.pathname.startsWith('/methodologies'),
    offres: location.pathname.startsWith('/offres'),
    demarrage: location.pathname.startsWith('/demarrage'),
  });

  function toggleSection(key: string) {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function isChildActive(children: { to: string }[]) {
    return children.some(c => location.pathname === c.to);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" role="navigation" aria-label="Navigation principale">
        <div className="sidebar-brand">
          <div className="egis-logo">
            <svg viewBox="0 0 32 32" width="32" height="32">
              <circle cx="16" cy="16" r="15" fill="#8dc63f" />
              <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="700" fontFamily="Arial">e</text>
            </svg>
          </div>
          <div>
            <h2 className="sidebar-title">Digital Standards</h2>
            <span className="sidebar-subtitle">Assistant</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navSections.map(item => {
            if ('to' in item && item.to) {
              const to = item.to;
              return (
                <NavLink
                  key={to}
                  to={to}
                  end
                  className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                >
                  <item.icon className="icon" size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            }

            const key = item.key!;
            const children = item.children!;
            const isOpen = expanded[key];
            const hasActiveChild = isChildActive(children);

            return (
              <div key={key} className="sidebar-group">
                <button
                  className={`sidebar-link sidebar-group-toggle${hasActiveChild ? ' active' : ''}`}
                  onClick={() => toggleSection(key)}
                  aria-expanded={isOpen}
                >
                  <item.icon className="icon" size={18} />
                  <span>{item.label}</span>
                  {isOpen ? <ChevronDown size={14} className="chevron" /> : <ChevronRight size={14} className="chevron" />}
                </button>
                {isOpen && (
                  <div className="sidebar-children">
                    {children.map(child => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) => `sidebar-link sidebar-sub-link${isActive ? ' active' : ''}`}
                      >
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <span className="sidebar-footer-text">Business Line Transport & Territoire</span>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-search">
              <Search size={16} color="var(--color-gray-400)" />
              <input type="text" placeholder="Rechercher…" aria-label="Recherche globale" />
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
