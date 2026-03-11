import { glossaire } from '../data/glossaire';
import { Badge } from '../components/Badge';

export default function Documentation() {
  const entries = Object.entries(glossaire).sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Documentation</h1>
          <p className="page-header-sub">Glossaire des acronymes et référentiels normatifs</p>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Glossaire des acronymes</h3>
        <div className="table-container">
          <div style={{ overflowX: 'auto' }}>
            <table>
              <thead>
                <tr><th>Acronyme</th><th>Définition</th></tr>
              </thead>
              <tbody>
                {entries.map(([key, value]) => (
                  <tr key={key}>
                    <td><code style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{key}</code></td>
                    <td style={{ fontSize: 'var(--text-sm)' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="section">
        <h3 className="section-title">Référentiels normatifs</h3>
        <div className="grid-2">
          {[
            { title: 'ISO 19650-1:2018', desc: 'Organisation et numérisation des informations — Concepts et principes', cat: 'Norme' },
            { title: 'ISO 19650-2:2018', desc: 'Phase de réalisation des actifs — Gestion de l\'information', cat: 'Norme' },
            { title: 'Guide Egis BIM/SIG', desc: 'Guide interne de méthodologie BIM-SIG pour les projets d\'infrastructure — BL Transport & Territoire', cat: 'Interne' },
            { title: 'IFC 4.0 / 4.3', desc: 'Industry Foundation Classes — format d\'échange ouvert pour les maquettes BIM', cat: 'Standard' },
          ].map(ref => (
            <div key={ref.title} className="kpi-card" style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
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
    </div>
  );
}
