import { MessageSquare, Star, RefreshCw } from "lucide-react";
import { useComment } from "../../../controllers/useComment";
import type { ProductCommentTypes } from "../../../types/commentTypes";
import { useTranslation } from "react-i18next";
interface ProductCommentsProps {productId: string;}



const RatingStars = ({ rating }: { rating: number }) => {
  const { t } = useTranslation();

  return (
    <div
      className="product-comments__stars" aria-label={t("store.productComments.ratingLabel", { rating })}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          fill={index < rating ? "currentColor" : "none"}
          className={index < rating ? "is-filled" : ""}
        />
      ))}
    </div>
  );
};



const CommentCard = ({ comment }: { comment: ProductCommentTypes }) => {
  const { t } = useTranslation();
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
          <div className="text text_md weight_600"> {t("store.productComments.client")} </div>
          <RatingStars rating={Math.max(0, Math.min(5, comment.rating || 0))} />
        </div>

        <div className="text text_sm"> {comment.comment || t("store.productComments.fallbackComment")}</div>

        {comment.image && (
          <div className="product-comment__image-link" aria-label={t("store.productComments.attachedImageLabel")}>
                <img src={comment.image} alt={t("store.productComments.attachedImageAlt")} className="product-comment__image" loading="lazy"/>
          </div>
        )}
      </div>
    </article>
  );
};




const ProductComments = ({ productId }: ProductCommentsProps) => {
  const { t } = useTranslation();
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
          <div className="text text_md weight_600">{t("store.productComments.heading")}</div>
          <div className="text text_sm">{t("store.productComments.description")}</div>
        </div>
      </header>

      {!isLoading && !isError && comments.length > 0 && (
        <div className="product-comments__summary">
          <div className="product-comments__average">
            <strong>{averageRating.toFixed(1)}</strong>
            <RatingStars rating={Math.round(averageRating)} />
            <span>
              {comments.length}{" "}
              {comments.length > 1 ? t("store.productComments.multipleReviews") : t("store.productComments.singleReview")}
            </span>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="product-comments__list" aria-label={t("store.productComments.loadingReviews")}>
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
            <div className="text text_xl weight_700">{t("store.productComments.errorTitle")}</div>
            <div className="text text_sm">{t("store.productComments.errorDescription")}</div>

            <button type="button" onClick={() => void refetch()} disabled={isFetching}>
              <RefreshCw size={16} />
              {isFetching ? t("store.productComments.loading") : t("store.productComments.retry")}
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
          <div className="text text_xl weight_700">{t("store.productComments.emptyTitle")}</div>
          <div className="text text_sm">{t("store.productComments.emptyDescription")}</div>
        </div>

      )}
    </section>
  );
};

export default ProductComments;