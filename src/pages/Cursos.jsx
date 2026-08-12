import { useState, useMemo } from 'react';
import { courses } from '../data/cursos';
import CardCurso from '../components/CardCurso';

const areas = ['Programação', 'Dados', 'Inteligência Artificial', 'Segurança da Informação', 'Computação em Nuvem', 'UX/UI', 'Gestão e Tecnologia'];
const niveis = ['Iniciante', 'Intermediário', 'Avançado'];

const sel = {
  border: '1px solid #ddd',
  borderRadius: 4,
  padding: '6px 10px',
  fontSize: '0.875rem',
  background: '#fff',
  cursor: 'pointer',
};

export default function Courses() {
  const [area, setArea] = useState('');
  const [nivel, setNivel] = useState('');
  const [modalidade, setModalidade] = useState('');

  const filtrados = useMemo(() => {
    let lista = courses;
    if (area) lista = lista.filter(c => c.area === area);
    if (nivel) lista = lista.filter(c => c.level === nivel);
    if (modalidade) lista = lista.filter(c => c.modality === modalidade);
    return lista;
  }, [area, nivel, modalidade]);

  const temFiltro = area || nivel || modalidade;

  function limpar() {
    setArea('');
    setNivel('');
    setModalidade('');
  }

  return (
    <main style={{ minHeight: '70vh' }}>
      <div style={{ padding: '24px 16px 20px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.75rem', margin: '0 0 4px' }}>
            Cursos
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#666', margin: 0 }}>
            Encontre opções de estudo em diferentes áreas de tecnologia, online e presencial em Campinas/SP
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '18px 16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14, alignItems: 'center' }}>
          <select value={area} onChange={e => setArea(e.target.value)} style={sel}>
            <option value="">Área</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select value={nivel} onChange={e => setNivel(e.target.value)} style={sel}>
            <option value="">Nível</option>
            {niveis.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <select value={modalidade} onChange={e => setModalidade(e.target.value)} style={sel}>
            <option value="">Modalidade</option>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>
          {temFiltro && (
            <button onClick={limpar} style={{ background: 'none', border: 'none', color: '#999', fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline' }}>
              Limpar
            </button>
          )}
        </div>

        <p style={{ fontSize: '0.8125rem', color: '#999', marginBottom: 8 }}>
          {filtrados.length} {filtrados.length === 1 ? 'curso encontrado' : 'cursos encontrados'}
        </p>

        {filtrados.length > 0 ? (
          <div>
            {filtrados.map((c) => <CardCurso key={c.id} course={c} />)}
            <p style={{ fontSize: '0.8125rem', color: '#999', marginTop: 24 }}>
              alguns links podem estar desatualizados — verifique sempre no site do curso
            </p>
          </div>
        ) : (
          <div style={{ border: '1px solid #ddd', borderRadius: 5, padding: '40px 20px', textAlign: 'center', background: '#fff' }}>
            <p style={{ fontWeight: 600, margin: '0 0 6px' }}>Nenhum curso encontrado</p>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: '0 0 16px' }}>Tente alterar os filtros.</p>
            <button onClick={limpar} style={{ background: '#f5f5f5', border: 'none', borderRadius: 4, padding: '7px 14px', fontSize: '0.875rem', cursor: 'pointer' }}>
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
