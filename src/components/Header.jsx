import { useState } from 'react';

export default function Header({ currentPage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Início', page: 'home' },
    { label: 'Cursos', page: 'courses' },
    { label: 'Áreas de TI', page: 'areas' },
    { label: 'Descubra seu perfil', page: 'quiz' },
  ];

  const handleNav = (page) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-inner">
        <button
          onClick={() => handleNav('home')}
          className="header-logo"
        >
          TrilhaTech
        </button>

        <nav className="nav-desktop-container">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`nav-button ${currentPage === page ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div style={{ flex: 1 }} />

        <button
          onClick={() => setMobileOpen(o => !o)}
          className="nav-mobile-btn"
          aria-label="Menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {mobileOpen && (
        <div className="mobile-menu-container">
          {navItems.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleNav(page)}
              className={`mobile-nav-button ${currentPage === page ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}