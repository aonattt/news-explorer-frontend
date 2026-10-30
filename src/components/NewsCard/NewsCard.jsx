import "./NewsCard.css";
import { formatDate } from "../../utils/format";
import placeholderImage from "../../images/card-placeholder.svg";

function NewsCard({
  article,
  variant = "search",
  isLoggedIn,
  isSaved,
  onSaveToggle,
  onDelete,
}) {
  const { title, description, publishedAt, source, url, urlToImage, keyword } =
    article;
  const isSavedVariant = variant === "saved";
  const saved = !isSavedVariant && isLoggedIn && isSaved(article);

  let actionModifier;
  let actionLabel;
  let tooltip = "";
  let handleAction;

  if (isSavedVariant) {
    actionModifier = "delete";
    actionLabel = "Remove from saved";
    tooltip = "Remove from saved";
    handleAction = () => onDelete(article);
  } else {
    actionModifier = saved ? "saved" : "save";
    actionLabel = saved ? "Remove from saved" : "Save article";
    if (isLoggedIn) {
      handleAction = () => onSaveToggle(article);
    } else {
      tooltip = "Sign in to save articles";
    }
  }

  return (
    <article className="news-card">
      <div className="news-card__image-wrapper">
        <img
          className="news-card__image"
          src={urlToImage || placeholderImage}
          alt={title}
          loading="lazy"
          onError={(evt) => {
            evt.currentTarget.src = placeholderImage;
          }}
        />
        {isSavedVariant && keyword && (
          <span className="news-card__keyword">{keyword}</span>
        )}
        <div className="news-card__actions">
          {tooltip && <span className="news-card__tooltip">{tooltip}</span>}
          <button
            type="button"
            className={`news-card__action news-card__action_type_${actionModifier}`}
            aria-label={actionLabel}
            onClick={handleAction}
            aria-disabled={!handleAction}
          />
        </div>
      </div>
      <a
        className="news-card__content"
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <time className="news-card__date" dateTime={publishedAt}>
          {formatDate(publishedAt)}
        </time>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </a>
    </article>
  );
}

export default NewsCard;
