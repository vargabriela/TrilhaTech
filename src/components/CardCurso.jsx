export default function CourseCard({ course }) {
  return (
    <div className="card-container">
      <p className="card-title">
        {course.title}
      </p>

      <p className="card-meta">
        {course.provider}
        {course.modality === 'Presencial' && <span className="card-meta-highlight"> - Campinas/SP</span>}
        {' — '}{course.level}, {course.duration}
        {course.free === false && <span className="card-meta-paid"> (pago)</span>}
      </p>

      {course.description && (
        <p className="card-description">
          {course.description}
        </p>
      )}

      <a href={course.url} target="_blank" rel="noopener noreferrer" className="card-link">
        Acesse
      </a>
    </div>
  );
}