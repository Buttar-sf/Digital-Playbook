import { Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import Accueil from './pages/Accueil';
import Introduction from './pages/Introduction';
import Contributeurs from './pages/Contributeurs';
import Processus from './pages/Processus';
import BPMNViewer from './pages/BPMNViewer';
import Taches from './pages/Taches';
import Responsabilites from './pages/Responsabilites';
import Offres from './pages/Offres';
import Demarrage from './pages/Demarrage';
import QR from './pages/QR';
import Documentation from './pages/Documentation';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/methodologies/introduction" element={<Introduction />} />
        <Route path="/methodologies/contributeurs" element={<Contributeurs />} />
        <Route path="/offres/processus" element={<Processus />} />
        <Route path="/offres/bpmn" element={<BPMNViewer />} />
        <Route path="/offres/taches" element={<Taches />} />
        <Route path="/offres/responsabilites" element={<Responsabilites />} />
        <Route path="/offres/tableau" element={<Offres />} />
        <Route path="/demarrage/bpmn" element={<Demarrage />} />
        <Route path="/demarrage/taches" element={<Demarrage />} />
        <Route path="/demarrage/responsabilites" element={<Demarrage />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
