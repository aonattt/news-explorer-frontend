import { useState } from "react";
import "./SearchResults.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import { CARDS_PER_PAGE, SERVER_ERROR_MESSAGE } from "../../utils/constants";
import notFoundIcon from "../../images/not-found.svg";

function SearchResults({ status, articles, isLoggedIn, onSaveToggle, isSaved }) {
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);
  const [shownArticles, setShownArticles] = useState(articles);

  // Start from the first three cards again whenever a new search comes in.
  if (articles !== shownArticles) {
    setShownArticles(articles);
    setVisibleCount(CARDS_PER_PAGE);
  }

  if (status === "idle") {
    return null;
  }

  if (status === "loading") {
    return (
      <section className="search-results search-results_state_message">
        <Preloader text="Searching for news..." />
      </section>
    );
  }

  if (status === "empty") {
    return (
      <section className="search-results search-results_state_message">
        <img
          className="search-results__icon"
          src={notFoundIcon}
          alt="Magnifying glass with a sad face"
        />
        <h2 className="search-results__message-title">Nothing found</h2>
        <p className="search-results__message">
          Sorry, but nothing matched your search terms.
        </p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="search-results search-results_state_message">
        <p className="search-results__message">{SERVER_ERROR_MESSAGE}</p>
      </section>
    );
  }

  return (
    <section className="search-results">
      <h2 className="search-results__title">Search results</h2>
      <NewsCardList
        articles={articles.slice(0, visibleCount)}
        isLoggedIn={isLoggedIn}
        onSaveToggle={onSaveToggle}
        isSaved={isSaved}
      />
      {visibleCount < articles.length && (
        <button
          type="button"
          className="search-results__more"
          onClick={() => setVisibleCount((count) => count + CARDS_PER_PAGE)}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export default SearchResults;
