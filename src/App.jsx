import { useState } from 'react';
import Header from './components/Header';
import Rodape from './components/Rodape';
import Inicio from './pages/Inicio';
import Cursos from './pages/Cursos';
import Areas from './pages/Areas';
import DetalhesArea from './pages/DetalhesArea';
import Quiz from './pages/Quiz';

export default function App() {
  const [page, setPage] = useState('home');
  const [areaId, setAreaId] = useState('dados');

  const navigate = (p, id) => {
    if (id) setAreaId(id);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f7f8f9' }}>
      <Header currentPage={page} onNavigate={navigate} />

      <div style={{ flex: 1 }}>
        {page === 'home' && <Inicio onNavigate={navigate} />}
        {page === 'courses' && <Cursos />}
        {page === 'areas' && <Areas onNavigate={navigate} />}
        {page === 'area-detail' && <DetalhesArea areaId={areaId} onNavigate={navigate} />}
        {page === 'quiz' && <Quiz onNavigate={navigate} />}
      </div>

      <Rodape />
    </div>
  );
}
