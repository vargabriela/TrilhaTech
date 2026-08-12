import { useState } from 'react';

const questions = [
  {
    id: 1,
    text: 'Qual atividade parece mais interessante para você?',
    options: [
      { key: 'A', label: 'Criar algo usando código' },
      { key: 'B', label: 'Encontrar padrões em informações' },
      { key: 'C', label: 'Investigar problemas e proteger sistemas' },
      { key: 'D', label: 'Criar soluções pensando na experiência das pessoas' },
    ],
  },
  {
    id: 2,
    text: 'Quando você recebe um problema, o que mais te interessa?',
    options: [
      { key: 'A', label: 'Entender como construir uma solução' },
      { key: 'B', label: 'Analisar os dados para descobrir o que está acontecendo' },
      { key: 'C', label: 'Investigar o que pode estar causando o problema' },
      { key: 'D', label: 'Entender como tornar a solução mais fácil para as pessoas' },
    ],
  },
  {
    id: 3,
    text: 'Qual resultado deixaria você mais satisfeito?',
    options: [
      { key: 'A', label: 'Um sistema funcionando' },
      { key: 'B', label: 'Uma análise que revela algo importante' },
      { key: 'C', label: 'Um ambiente mais seguro' },
      { key: 'D', label: 'Uma experiência simples e agradável' },
    ],
  },
  {
    id: 4,
    text: 'Como você se sente trabalhando com números e informações?',
    options: [
      { key: 'A', label: 'Gosto bastante' },
      { key: 'B', label: 'Tenho curiosidade' },
      { key: 'C', label: 'Prefiro problemas mais práticos' },
      { key: 'D', label: 'Prefiro criatividade e experiência do usuário' },
    ],
  },
  {
    id: 5,
    text: 'Qual desses temas despertaria mais sua curiosidade?',
    options: [
      { key: 'A', label: 'Programação' },
      { key: 'B', label: 'Dados e inteligência artificial' },
      { key: 'C', label: 'Segurança e redes' },
      { key: 'D', label: 'Design e experiência do usuário' },
    ],
  },
  {
    id: 6,
    text: 'Você prefere principalmente...',
    options: [
      { key: 'A', label: 'Construir' },
      { key: 'B', label: 'Analisar' },
      { key: 'C', label: 'Investigar' },
      { key: 'D', label: 'Criar e melhorar experiências' },
    ],
  },
  {
    id: 7,
    text: 'Quanto você já conhece de tecnologia?',
    options: [
      { key: 'A', label: 'Estou começando' },
      { key: 'B', label: 'Já fiz alguns cursos' },
      { key: 'C', label: 'Já tenho alguma experiência' },
      { key: 'D', label: 'Já estudo ou trabalho na área' },
    ],
  },
];

// aqui guardo os resultados possiveis do quiz
// cada letra corresponde a uma area: A = programacao, B = dados, C = seguranca, D = ux
const resultados = {
  desenvolvimento: {
    titulo: 'Desenvolvimento de Software',
    areas: ['Desenvolvimento Web', 'Desenvolvimento Mobile', 'Qualidade de Software'],
    descricao: 'Suas respostas indicam interesse em construir sistemas e escrever código para criar soluções funcionais.',
  },
  dados: {
    titulo: 'Análise de Dados e Inteligência Artificial',
    areas: ['Análise de Dados', 'Ciência de Dados', 'Inteligência Artificial'],
    descricao: 'Suas respostas indicam interesse em analisar informações, encontrar padrões e transformar dados em respostas.',
  },
  seguranca: {
    titulo: 'Segurança da Informação e Computação em Nuvem',
    areas: ['Segurança da Informação', 'Computação em Nuvem', 'Redes'],
    descricao: 'Suas respostas indicam interesse em investigar problemas, proteger sistemas e entender como infraestruturas funcionam.',
  },
  uxui: {
    titulo: 'UX/UI e Design de Produtos',
    areas: ['UX Design', 'UI Design', 'Pesquisa com Usuários'],
    descricao: 'Suas respostas indicam interesse em criar interfaces pensando nas pessoas e tornar a tecnologia mais fácil de usar.',
  },
};

function calcularResultado(respostas) {
  let dev = 0, dados = 0, seg = 0, ux = 0;

  for (let i = 0; i < respostas.length - 1; i++) {
    const r = respostas[i];
    if (r === 'A') dev++;
    if (r === 'B') dados++;
    if (r === 'C') seg++;
    if (r === 'D') ux++;
  }

  const scores = { desenvolvimento: dev, dados: dados, seguranca: seg, uxui: ux };
  let primeiro = 'desenvolvimento';
  let segundo = 'dados';

  for (const key in scores) {
    if (scores[key] > scores[primeiro]) {
      segundo = primeiro;
      primeiro = key;
    } else if (scores[key] > scores[segundo] && key !== primeiro) {
      segundo = key;
    }
  }

  return [primeiro, segundo];
}

export default function Quiz({ onNavigate }) {
  const [tela, setTela] = useState('intro'); // controla qual tela mostrar
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [selecionada, setSelecionada] = useState('');
  const [resultado, setResultado] = useState([]);

  function comecar() {
    setTela('quiz');
    setPerguntaAtual(0);
    setRespostas([]);
    setSelecionada('');
  }

  function proximo() {
    if (!selecionada) return;
    const novas = [...respostas, selecionada];
    setRespostas(novas);
    setSelecionada('');

    if (perguntaAtual < questions.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setResultado(calcularResultado(novas));
      setTela('resultado');
    }
  }

  function voltar() {
    if (perguntaAtual === 0) {
      setTela('intro');
      return;
    }
    setSelecionada(respostas[perguntaAtual - 1]);
    setRespostas(respostas.slice(0, -1));
    setPerguntaAtual(perguntaAtual - 1);
  }

  const q = questions[perguntaAtual];
  const res1 = resultado[0] ? resultados[resultado[0]] : null;
  const res2 = resultado[1] ? resultados[resultado[1]] : null;

  return (
    <main style={{ minHeight: '70vh' }}>
      <div style={{ padding: '24px 16px 20px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.75rem', margin: '0 0 4px' }}>
            Descubra seu perfil em tecnologia
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#666', margin: 0 }}>
            Responda algumas perguntas sobre seus interesses e descubra quais áreas podem combinar com você.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>

        {tela === 'intro' && (
          <div>
            <p style={{ fontSize: '0.9375rem', color: '#444', lineHeight: 1.65, margin: '0 0 14px' }}>
              Este quiz tem 7 perguntas e leva cerca de 2 minutos. Ao final você verá quais áreas de TI
              podem combinar com seus interesses, junto com sugestões de cursos.
            </p>
            <p style={{ fontSize: '0.875rem', color: '#666', margin: '0 0 20px' }}>
              Este quiz é uma ferramenta de orientação inicial e não determina uma escolha profissional.
            </p>
            <button onClick={comecar} style={{ padding: '6px 14px', cursor: 'pointer' }}>
              Começar quiz
            </button>
          </div>
        )}

        {tela === 'quiz' && (
          <div>
            <p style={{ fontSize: '0.8125rem', color: '#999', margin: '0 0 16px' }}>
              Pergunta {perguntaAtual + 1} de {questions.length}
            </p>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '1rem', margin: '0 0 14px', lineHeight: 1.4 }}>
              {q.text}
            </p>

            <div style={{ marginBottom: 20 }}>
              {q.options.map((opt) => (
                <label
                  key={opt.key}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    padding: '9px 0',
                    borderBottom: '1px solid #f5f5f5',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: selecionada === opt.key ? '#1d4ed8' : '#222',
                    fontWeight: selecionada === opt.key ? 500 : 400,
                  }}
                >
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt.key}
                    checked={selecionada === opt.key}
                    onChange={() => setSelecionada(opt.key)}
                    style={{ marginTop: 3, flexShrink: 0 }}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={voltar} style={{ cursor: 'pointer' }}>
                Voltar
              </button>
              <button
                onClick={proximo}
                disabled={!selecionada}
                style={{ padding: '6px 14px', cursor: 'pointer' }}
              >
                {perguntaAtual < questions.length - 1 ? 'Próxima' : 'Ver resultado'}
              </button>
            </div>
          </div>
        )}

        {tela === 'resultado' && res1 && (
          <div>
            <p style={{ fontSize: '0.8125rem', color: '#999', margin: '0 0 4px' }}>Seu resultado</p>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '1.5rem', margin: '0 0 8px' }}>
              {res1.titulo}
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#555', lineHeight: 1.65, margin: '0 0 24px' }}>
              {res1.descricao}
            </p>

            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '0.9375rem', margin: '0 0 8px' }}>
              Áreas que podem fazer sentido para você
            </h3>
            <ul style={{ margin: '0 0 16px', padding: '0 0 0 18px' }}>
              {res1.areas.map((a, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: '#444', marginBottom: 4 }}>{a}</li>
              ))}
            </ul>

            {res2 && (
              <div style={{ marginBottom: 24 }}>
                <p style={{ fontSize: '0.8125rem', color: '#999', margin: '0 0 8px' }}>Também pode interessar:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {res2.areas.map((a, i) => (
                    <span key={i} style={{ fontSize: '0.8125rem', color: '#444', background: '#f5f5f5', padding: '3px 9px', borderRadius: 3 }}>{a}</span>
                  ))}
                </div>
              </div>
            )}

            <p style={{ fontSize: '0.875rem', marginBottom: 4 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('courses'); }}>Clique para ver os cursos</a>
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: 20 }}>
              <a href="#" onClick={(e) => { e.preventDefault(); setTela('intro'); setPerguntaAtual(0); setRespostas([]); setSelecionada(''); setResultado([]); }}>Clique para refazer o quiz</a>
            </p>

            <p style={{ fontSize: '0.8125rem', color: '#999', margin: 0 }}>
              Este resultado é apenas uma orientação inicial. Veja as outras áreas e descubra o que combina com voce
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
