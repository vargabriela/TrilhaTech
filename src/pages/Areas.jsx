import { areas } from '../data/areas';

export default function Areas() {
  return (
    <main style={{ minHeight: '70vh' }}>
      <div style={{ padding: '24px 16px 18px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.75rem', margin: '0 0 4px' }}>
            Áreas de tecnologia
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#666', margin: 0 }}>
            Conheça diferentes caminhos dentro da área de TI
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px 40px' }}>
        {areas.map((area) => (
          <div key={area.id} style={{ padding: '10px 0' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', margin: '0 0 3px' }}>
              {area.title}
            </p>
            <p style={{ margin: '0 0 5px', fontSize: '0.9rem', color: '#666', lineHeight: 1.55, maxWidth: 640 }}>
              {area.shortDescription}
            </p>
            <a
              href={area.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.8125rem' }}
            >
              Saiba mais
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}
