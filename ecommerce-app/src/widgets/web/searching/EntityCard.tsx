



import { Link } from "react-router-dom";

interface Props { to: string; title: string; image: string | null;}

export default function EntityCard({ to, title, image }: Props) {
  return (
    <Link to={to} className="entity-card">
      <div className="entity-card__media">
        {image ? (
          <img src={image} alt={title} loading="lazy" />
        ) : (
          <span className="entity-card__letter">{title.charAt(0).toUpperCase()}</span>
        )}
      </div>
      <span className="text text_sm">{title}</span>
    </Link>
  );
}