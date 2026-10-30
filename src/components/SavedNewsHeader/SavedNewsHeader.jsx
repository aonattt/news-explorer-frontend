import { useContext } from "react";
import "./SavedNewsHeader.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { formatKeywords, pluralize } from "../../utils/format";

function SavedNewsHeader({ articles }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="saved-news-header">
      <p className="saved-news-header__label">Saved articles</p>
      <h1 className="saved-news-header__title">
        {currentUser?.name}, you have{" "}
        {pluralize(articles.length, "saved article")}
      </h1>
      {articles.length > 0 && (
        <p className="saved-news-header__keywords">
          By keywords:{" "}
          <span className="saved-news-header__keywords-list">
            {formatKeywords(articles)}
          </span>
        </p>
      )}
    </section>
  );
}

export default SavedNewsHeader;
