import { useState } from 'react';
import { FolderOpen, Check, Shield, ChevronRight } from 'lucide-react';
import { ecdCriteres } from '../data/mockData';
import { Badge } from '../components/Badge';

export default function ECD() {
  const [selectedEcd, setSelectedEcd] = useState<string>('ACC');
  const [activeTab, setActiveTab] = useState<'comparaison' | 'arborescence' | 'statuts' | 'droits'>('comparaison');

  const ecds = [
    { id: 'ACC', name: 'Autodesk ACC', desc: 'Cloud BIM + GED intégrée. Idéal projets multi-maquettes.', score: 32 },
    { id: 'ProjectWise', name: 'Bentley ProjectWise', desc: 'GED enterprise, workflows avancés, projets infra.', score: 29 },
    { id: 'SharePoint', name: 'SharePoint / Teams', desc: 'GED Microsoft 365, déploiement rapide, coût réduit.', score: 29 },
  ];

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>ECD / CDE</h1>
          <p className="page-header-sub">Environnement Commun de Données — Choix, configuration et gestion</p>
        </div>
      </div>

      {/* Decision Assistant */}
      <div className="section">
        <h3 className="section-title">Assistant de choix ECD</h3>
        <div className="grid-3">
          {ecds.map(ecd => (
            <div key={ecd.id} className="card" style={{ cursor: 'pointer', border: selectedEcd === ecd.id ? '2px solid var(--color-primary-500)' : undefined }} onClick={() => setSelectedEcd(ecd.id)}>
              <div className="card-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <FolderOpen size={24} style={{ color: selectedEcd === ecd.id ? 'var(--color-primary-500)' : 'var(--color-gray-400)' }} />
                  <h4>{ecd.name}</h4>
                  {selectedEcd === ecd.id && <Check size={18} style={{ marginLeft: 'auto', color: 'var(--color-primary-500)' }} />}
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 12 }}>{ecd.desc}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>Score global :</span>
                  <span style={{ fontSize: 'var(--text-md)', fontWeight: 700, color: 'var(--color-primary-600)' }}>{ecd.score}/40</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        {(['comparaison', 'arborescence', 'statuts', 'droits'] as const).map(tab => (
          <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'comparaison' ? 'Grille de critères' : tab === 'arborescence' ? 'Arborescence dossiers' : tab === 'statuts' ? 'Statuts ISO 19650' : 'Matrice des droits'}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'comparaison' && (
        <div className="table-container">
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-grid">
              <thead>
                <tr>
                  <th>Critère</th>
                  <th>ACC</th>
                  <th>ProjectWise</th>
                  <th>SharePoint</th>
                </tr>
              </thead>
              <tbody>
                {ecdCriteres.map(c => (
                  <tr key={c.critere}>
                    <td>{c.critere}</td>
                    <td><span className={`score-cell score-${c.acc}`}>{c.acc}</span></td>
                    <td><span className={`score-cell score-${c.projectwise}`}>{c.projectwise}</span></td>
                    <td><span className={`score-cell score-${c.sharepoint}`}>{c.sharepoint}</span></td>
                  </tr>
                ))}
                <tr style={{ fontWeight: 700, background: 'var(--color-gray-50)' }}>
                  <td style={{ fontWeight: 700 }}>Total</td>
                  <td><strong>32</strong></td>
                  <td><strong>29</strong></td>
                  <td><strong>29</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'arborescence' && (
        <div className="card">
          <div className="card-body">
            <h4 style={{ marginBottom: 16 }}>Gabarit d'arborescence dossiers (ISO 19650)</h4>
            <div className="folder-tree">
              <ul style={{ paddingLeft: 0 }}>
                <li><span className="folder">📁 00_Management</span>
                  <ul><li>00.01_BEP</li><li>00.02_RACI</li><li>00.03_TIDP_MIDP</li><li>00.04_Comptes_rendus</li><li>00.05_Planning</li></ul>
                </li>
                <li><span className="folder">📁 10_Correspondance</span>
                  <ul><li>10.01_MOA</li><li>10.02_Partenaires</li><li>10.03_Sous_traitants</li></ul>
                </li>
                <li><span className="folder">📁 20_Données_Entrantes</span>
                  <ul><li>20.01_Topographie</li><li>20.02_Géotechnique</li><li>20.03_Cadastre_SIG</li><li>20.04_Existant</li></ul>
                </li>
                <li><span className="folder">📁 30_Production</span>
                  <ul><li>30.01_Maquettes_BIM</li><li>30.02_Plans_2D</li><li>30.03_Notes_calcul</li><li>30.04_SIG_Couches</li></ul>
                </li>
                <li><span className="folder">📁 40_Coordination</span>
                  <ul><li>40.01_Maquettes_fédérées</li><li>40.02_Clash_reports</li><li>40.03_Revues</li></ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'statuts' && (
        <div className="card">
          <div className="card-body">
            <h4 style={{ marginBottom: 16 }}>Statuts documentaires ISO 19650</h4>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gray-600)', marginBottom: 24 }}>
              Chaque document/maquette transite par 4 statuts normalisés. Les transitions sont contrôlées par le circuit de validation.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { statut: 'WIP', label: 'Work in Progress', desc: 'En cours de production, visible uniquement par l\'auteur et son équipe', variant: 'wip' as const },
                { statut: 'Shared', label: 'Partagé', desc: 'Partagé avec les autres disciplines pour coordination', variant: 'shared' as const },
                { statut: 'Published', label: 'Publié', desc: 'Validé et publié, livrable officiel', variant: 'published' as const },
                { statut: 'Archive', label: 'Archivé', desc: 'Version archivée, remplacée par une version ultérieure', variant: 'archive' as const },
              ].map((s, i) => (
                <div key={s.statut} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 140, textAlign: 'center' }}>
                    <Badge variant={s.variant}>{s.statut}</Badge>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>{s.label}</strong>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)', maxWidth: 160 }}>{s.desc}</span>
                  </div>
                  {i < 3 && <ChevronRight size={20} style={{ color: 'var(--color-gray-300)' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'droits' && (
        <div className="table-container">
          <div className="card-header">
            <h3>Matrice des droits d'accès</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-gray-500)' }}>
                <Shield size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> L = Lecture · E = Écriture · A = Admin · — = Aucun
              </span>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Dossier</th>
                  <th>BIM Manager</th>
                  <th>SIG Manager</th>
                  <th>Chef discipline</th>
                  <th>BIM Coord.</th>
                  <th>Gest. Doc.</th>
                  <th>MOA / Client</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['00_Management', 'A', 'A', 'L', 'L', 'E', 'L'],
                  ['10_Correspondance', 'E', 'E', 'L', 'L', 'E', 'L'],
                  ['20_Données_Entrantes', 'A', 'A', 'L', 'L', 'E', '—'],
                  ['30_Production', 'A', 'A', 'E', 'E', 'L', '—'],
                  ['40_Coordination', 'A', 'E', 'L', 'E', 'L', 'L'],
                ].map(row => (
                  <tr key={row[0]}>
                    <td className="td-bold" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)' }}>{row[0]}</td>
                    {row.slice(1).map((cell, i) => (
                      <td key={i} style={{ textAlign: 'center', fontWeight: 600, color: cell === 'A' ? 'var(--color-error)' : cell === 'E' ? 'var(--color-primary-600)' : cell === 'L' ? 'var(--color-gray-500)' : 'var(--color-gray-300)' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
