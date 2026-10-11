import { MessageSquare, Star, UserRound, RefreshCw } from "lucide-react";
import { useComment } from "../../../controllers/useComment";
import type { ProductCommentTypes } from "../../../types/commentTypes";

interface ProductCommentsProps {productId: string;}

const formatDate = (date?: string) => {
    if (!date) return "";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return "";
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(parsedDate);
};

const RatingStars = ({ rating }: { rating: number }) => (
  <div className="product-comments__stars" aria-label={`Note de ${rating} sur 5`}>
    {Array.from({ length: 5 }, (_, index) => (
      <Star key={index} size={16} fill={index < rating ? "currentColor" : "none"} className={index < rating ? "is-filled" : ""}/>
    ))}
  </div>
);



const CommentCard = ({ comment }: { comment: ProductCommentTypes }) => {
  return (
    <article className="product-comment">
      <div className="product-comment__avatar"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="1.4em" height="1.4em" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"><circle cx="12" cy="6" r="4"/>
                <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z"/></g>
            </svg>
      </div>

      <div className="product-comment__body">
        <div className="product-comment__header">
          <div className="text text_md weight_600"> Client </div>
          <RatingStars rating={Math.max(0, Math.min(5, comment.rating || 0))} />
        </div>

        <div className="text text_sm"> {comment.comment || "Aucun commentaire disponible."}</div>

        {comment.image && (
          <div className="product-comment__image-link" aria-label="Voir l’image jointe au commentaire">
                <img src={comment.image} alt="Image jointe au commentaire" className="product-comment__image" loading="lazy"/>
          </div>
        )}
      </div>
    </article>
  );
};




const ProductComments = ({ productId }: ProductCommentsProps) => {
  const { data: comments = [], isLoading, isError, refetch, isFetching,} = useComment(productId);

  const averageRating =
    comments.length > 0
      ? comments.reduce((sum, item) => sum + (Number(item.rating) || 0), 0) /
        comments.length
      : 0;

  return (
    <section className="product-comments">
      <header className="product-comments__heading">
        <div className="product-comments__heading-icon">
          <MessageSquare size={23} />
        </div>

        <div>
          <div className="text text_md weight_600">Avis des clients</div>
          <div className="text text_sm">Découvrez les retours des clients sur ce produit.</div>
        </div>
      </header>

      {!isLoading && !isError && comments.length > 0 && (
        <div className="product-comments__summary">
          <div className="product-comments__average">
            <strong>{averageRating.toFixed(1)}</strong>
            <RatingStars rating={Math.round(averageRating)} />
            <span>
              {comments.length}{" "}
              {comments.length > 1 ? "avis clients" : "avis client"}
            </span>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="product-comments__list" aria-label="Chargement des avis">
          {Array.from({ length: 3 }, (_, index) => (
            <div className="product-comment-skeleton" key={index}>
              <div className="product-comment-skeleton__avatar" />
              <div className="product-comment-skeleton__content">
                <span />
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="product-comments__state" role="alert">
          <MessageSquare size={30} />
          <h4>Impossible de charger les avis</h4>
          <p>Une erreur est survenue. Veuillez réessayer.</p>

          <button
            type="button"
            onClick={() => void refetch()}
            disabled={isFetching}
          >
            <RefreshCw size={16} />
            {isFetching ? "Chargement..." : "Réessayer"}
          </button>
        </div>
      ) : comments.length > 0 ? (
        <div className="product-comments__list">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="product-comments__state">
          <MessageSquare size={32} />
          <h4>Aucun avis pour le moment</h4>
          <p>Soyez le premier à partager votre expérience avec ce produit.</p>
        </div>
      )}
    </section>
  );
};

export default ProductComments;