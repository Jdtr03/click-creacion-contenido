import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import CreacionContenido from './pages/CreacionContenido';

/**
 * Helper component to scroll to top on route change
 * and fire Meta Pixel PageView on each navigation
 */
// ID de píxel para CreacionContenido (Suscripciones audiovisuales / Campañas Meta)
const PIXEL_CONTENIDO = '673387272426495';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disparar PageView al píxel de Creación de Contenido
    if (typeof window.fbq === 'function') {
      window.fbq('trackSingle', PIXEL_CONTENIDO, 'PageView');
    }

    // Si hay un hash (ej. #paquetes-contenido), hacer scroll a ese elemento
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 96; // altura del navbar
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        return;
      }
    }
    // Si no hay hash, ir al tope
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CreacionContenido />} />
        <Route path="/creacion-contenido" element={<CreacionContenido />} />
        <Route path="*" element={<CreacionContenido />} />
      </Routes>
    </Router>
  );
}

export default App;
