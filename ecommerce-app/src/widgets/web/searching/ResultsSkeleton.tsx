




export default function ResultsSkeleton() {
  return (
    <div className="search-grid search-grid--products" aria-busy="true" aria-label="Loading">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton skeleton-card__media" />
          <div className="skeleton skeleton-card__line" />
          <div className="skeleton skeleton-card__line skeleton-card__line--short" />
        </div>
      ))}
    </div>
  );
}