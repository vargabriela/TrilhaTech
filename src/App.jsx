import { useState } from 'react';
import Header from './components/Header';
import Rodape from './components/Rodape';
import Inicio from './pages/Inicio';
import Cursos from './pages/Cursos';
import Areas from './pages/Areas';
import Quiz from './pages/Quiz';

export default function App() {
  const [page, setPage] = useState('home');

  const navigate = (pageName) => {
    setPage(pageName);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: '#f7f8f9'
      }}
    >
      <Header
        currentPage={page}
        onNavigate={navigate}
      />

      <main style={{ flex: 1 }}>
        {page === 'home' && (
          <Inicio onNavigate={navigate} />
        )}

        {page === 'courses' && (
          <Cursos />
        )}

        {page === 'areas' && (
          <Areas />
        )}

        {page === 'quiz' && (
          <Quiz onNavigate={navigate} />
        )}
      </main>

      <Rodape />
    </div>
  );
}
