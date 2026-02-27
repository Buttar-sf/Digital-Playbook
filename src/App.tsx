import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Accueil from './pages/Accueil';
import Offres from './pages/Offres';
import Projets from './pages/Projets';
import ECD from './pages/ECD';
import BEP from './pages/BEP';
import TIDP from './pages/TIDP';
import SIG from './pages/SIG';
import QR from './pages/QR';
import Qualite from './pages/Qualite';
import Parametres from './pages/Parametres';

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Accueil />} />
        <Route path="/offres" element={<Offres />} />
        <Route path="/projets" element={<Projets />} />
        <Route path="/projets/ecd" element={<ECD />} />
        <Route path="/projets/bep" element={<BEP />} />
        <Route path="/projets/tidp" element={<TIDP />} />
        <Route path="/projets/sig" element={<SIG />} />
        <Route path="/qr" element={<QR />} />
        <Route path="/qualite" element={<Qualite />} />
        <Route path="/parametres" element={<Parametres />} />
      </Route>
    </Routes>
  );
}
