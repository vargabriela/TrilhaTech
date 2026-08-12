import { areas } from '../data/areas';
import { courses } from '../data/cursos';
import CardCurso from '../components/CardCurso';

const areaToCourseArea = {
  desenvolvimento: 'Programação',
  dados: 'Dados',
  ia: 'Inteligência Artificial',
  seguranca: 'Segurança da Informação',
  cloud: 'Computação em Nuvem',
  uxui: 'UX/UI',
  qualidade: 'Programação',
};

export default function AreaDetail({ areaId, onNavigate }) {
  const area = areas.find(a => a.id === areaId) ?? areas[1];
  const relatedCourses = courses.filter(c => c.area === areaToCourseArea[area.id]).slice(0, 3);

  return (
    <main style={{ minHeight: '70vh' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #ddd', padding: '12px 16px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', fontSize: '0.8125rem', color: '#666' }}>
          <button
            onClick={() => onNavigate('areas')}
            style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: '0.8125rem', padding: 0 }}
          >
            Áreas de TI
          </button>
          {' / '}
          {area.title}
        </div>
      </div>

      <div style={{ background: '#fff', borderBottom: '1px solid #ddd', padding: '22px 16px 20px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.75rem', margin: '0 0 10px' }}>
            {area.title}
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#555', lineHeight: 1.65, margin: 0, maxWidth: 600 }}>
            {area.fullDescription}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '20px 16px' }}>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', margin: '0 0 10px' }}>
            O que você pode encontrar nessa área?
          </h2>
          <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
            {area.whatYouDo.map((item, i) => (
              <li key={i} style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.5, marginBottom: 5 }}>{item}</li>
            ))}
          </ul>
        </section>

        <section style={{ marginBottom: 28, marginTop: 4 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', margin: '0 0 10px' }}>
            Conhecimentos para começar
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {area.startingKnowledge.map((k, i) => (
              <span key={i} style={{
                fontSize: '0.8125rem', color: '#444',
                background: '#f5f5f5', border: '1px solid #ddd',
                padding: '3px 10px', borderRadius: 3,
              }}>
                {k}
              </span>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', margin: '0 0 12px' }}>
            Por onde começar?
          </h2>
          {relatedCourses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
              {relatedCourses.map(c => <CardCurso key={c.id} course={c} />)}
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: '#999' }}>Nenhum curso encontrado para esta área ainda.</p>
          )}
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('courses')}
              style={{ background: '#1d4ed8', color: '#fff', border: 'none', borderRadius: 5, padding: '8px 16px', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}
            >
              Explorar cursos
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              style={{ background: '#fff', color: '#222', border: '1px solid #ddd', borderRadius: 5, padding: '8px 16px', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              Fazer o quiz novamente
            </button>
          </div>
        </section>

        <p style={{ fontSize: '0.875rem', color: '#666', borderTop: '1px solid #ddd', paddingTop: 18, margin: 0 }}>
          Essa área parece interessante? Explore outras áreas antes de decidir por onde começar.{' '}
          <button
            onClick={() => onNavigate('areas')}
            style={{ background: 'none', border: 'none', color: '#1d4ed8', cursor: 'pointer', fontSize: '0.875rem', padding: 0, textDecoration: 'underline' }}
          >
            Ver todas as áreas
          </button>
        </p>

      </div>
    </main>
  );
}
