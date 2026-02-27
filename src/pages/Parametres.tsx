import { useState } from 'react';
import { Users, Grid3x3, Tag, BookOpen } from 'lucide-react';
import { equipe, raciData } from '../data/mockData';
import { Badge } from '../components/Badge';

export default function Parametres() {
  const [activeTab, setActiveTab] = useState<'roles' | 'raci' | 'nomenclatures' | 'referentiels'>('roles');

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Paramètres</h1>
          <p className="page-header-sub">Rôles, RACI, nomenclatures et référentiels</p>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
          <Users size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Rôles & Équipe
        </button>
        <button className={`tab ${activeTab === 'raci' ? 'active' : ''}`} onClick={() => setActiveTab('raci')}>
          <Grid3x3 size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Matrice RACI
        </button>
        <button className={`tab ${activeTab === 'nomenclatures' ? 'active' : ''}`} onClick={() => setActiveTab('nomenclatures')}>
          <Tag size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Nomenclatures
        </button>
        <button className={`tab ${activeTab === 'referentiels' ? 'active' : ''}`} onClick={() => setActiveTab('referentiels')}>
          <BookOpen size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />Référentiels
        </button>
      </div>

      {activeTab === 'roles' && (
        <div className="table-container">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Email</th>
                  <th>Organisation</th>
                  <th>Disponibilité</th>
                </tr>
              </thead>
              <tbody>
                {equipe.map(m => (
                  <tr key={m.id}>
                    <td className="td-bold">{m.nom}</td>
                    <td><Badge variant={
                      m.role.includes('BIM') ? 'info' :
                      m.role.includes('SIG') || m.role.includes('Géo') ? 'success' :
                      m.role.includes('Chef') ? 'warning' : 'neutral'
                    }>{m.role}</Badge></td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>{m.email}</td>
                    <td>{m.organisation}</td>
                    <td>
                      <Badge variant={m.disponibilite === 'Disponible' ? 'success' : m.disponibilite === 'Partiel' ? 'warning' : 'error'}>
                        {m.disponibilite}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'raci' && (
        <div>
          <div className="alert alert-info section">
            <strong>R</strong> = Responsable (exécute) · <strong style={{ color: 'var(--color-error)' }}>A</strong> = Accountable (valide) · <strong style={{ color: 'var(--color-warning)' }}>C</strong> = Consulté · <strong style={{ color: 'var(--color-gray-400)' }}>I</strong> = Informé
          </div>
          <div className="table-container">
            <div style={{ overflowX: 'auto' }}>
              <table className="raci-table">
                <thead>
                  <tr>
                    <th>Tâche</th>
                    {raciData.roles.map(r => <th key={r}>{r}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {raciData.tasks.map((task, i) => (
                    <tr key={task}>
                      <td>{task}</td>
                      {raciData.matrix[i].map((cell, j) => (
                        <td key={j} className={cell ? `raci-${cell}` : ''}>{cell || '—'}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'nomenclatures' && (
        <div>
          <div className="grid-2">
            <div className="card">
              <div className="card-header"><h3>Convention de nommage fichiers</h3></div>
              <div className="card-body">
                <code style={{ display: 'block', padding: 16, background: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-sm)', lineHeight: 2, marginBottom: 16 }}>
                  [Projet]-[Émetteur]-[Discipline]-[Type]-[Zone]-[Niveau]-[Numéro]-[Révision]
                </code>
                <div className="table-container">
                  <table>
                    <thead><tr><th>Champ</th><th>Description</th><th>Exemple</th></tr></thead>
                    <tbody>
                      {[
                        ['Projet', 'Code projet (6 car.)', 'PRJ001'],
                        ['Émetteur', 'Code entreprise (3 car.)', 'EGS'],
                        ['Discipline', 'Code discipline (3 car.)', 'STR'],
                        ['Type', 'Type de document', 'M3 (maquette 3D)'],
                        ['Zone', 'Zone géographique', 'Z01'],
                        ['Niveau', 'Niveau / étage', 'N00'],
                        ['Numéro', 'Numéro séquentiel', '0001'],
                        ['Révision', 'Indice de révision', 'P01'],
                      ].map(row => (
                        <tr key={row[0]}>
                          <td className="td-bold">{row[0]}</td>
                          <td style={{ fontSize: 'var(--text-xs)' }}>{row[1]}</td>
                          <td><code style={{ fontSize: 'var(--text-xs)' }}>{row[2]}</code></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Codes disciplines</h3></div>
              <div className="card-body">
                <div className="table-container">
                  <table>
                    <thead><tr><th>Code</th><th>Discipline</th></tr></thead>
                    <tbody>
                      {[
                        ['STR', 'Structure / Ouvrages d\'art'],
                        ['RTE', 'Route / Chaussée'],
                        ['GEO', 'Géotechnique'],
                        ['HYD', 'Hydraulique'],
                        ['ENV', 'Environnement'],
                        ['SIG', 'Systèmes d\'information géographique'],
                        ['ARC', 'Architecture'],
                        ['CRD', 'Coordination'],
                        ['MGT', 'Management / Gestion'],
                      ].map(row => (
                        <tr key={row[0]}>
                          <td><code style={{ fontWeight: 700 }}>{row[0]}</code></td>
                          <td>{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'referentiels' && (
        <div>
          <h3 className="section-title">Référentiels normatifs & standards</h3>
          <div className="grid-2">
            {[
              { title: 'ISO 19650-1:2018', desc: 'Organisation et numérisation des informations relatives aux bâtiments et ouvrages de génie civil — Partie 1 : Concepts et principes', cat: 'Norme' },
              { title: 'ISO 19650-2:2018', desc: 'Phase de réalisation des actifs — Gestion de l\'information', cat: 'Norme' },
              { title: 'ISO 19650-3:2020', desc: 'Phase d\'exploitation des actifs', cat: 'Norme' },
              { title: 'Guide Egis BIM/SIG', desc: 'Guide interne de méthodologie BIM et SIG pour les projets d\'infrastructure', cat: 'Interne' },
              { title: 'IFC 4.0 / 4.3', desc: 'Industry Foundation Classes — format d\'échange ouvert pour les maquettes BIM', cat: 'Standard' },
              { title: 'Uniclass 2015', desc: 'Système de classification unifié pour l\'industrie de la construction', cat: 'Classification' },
            ].map(ref => (
              <div key={ref.title} className="kpi-card" style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
                <BookOpen size={20} style={{ color: 'var(--color-primary-500)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>{ref.title}</strong>
                    <Badge variant={ref.cat === 'Norme' ? 'info' : ref.cat === 'Interne' ? 'warning' : 'neutral'}>{ref.cat}</Badge>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-600)', margin: 0 }}>{ref.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
