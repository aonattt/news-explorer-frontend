import "./SavedNews.css";
import Header from "../Header/Header";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ articles, onLogout, onDelete }) {
  return (
    <>
      <Header theme="light" isLoggedIn onLogout={onLogout} />
      <main className="saved-news">
        <SavedNewsHeader articles={articles} />
        {articles.length > 0 && (
          <section className="saved-news__cards" aria-label="Saved articles">
            <NewsCardList
              articles={articles}
              variant="saved"
              onDelete={onDelete}
            />
          </section>
        )}
      </main>
    </>
  );
}

export default SavedNews;
