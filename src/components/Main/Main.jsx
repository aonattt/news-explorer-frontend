import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import SearchResults from "../SearchResults/SearchResults";
import About from "../About/About";

function Main({
  isLoggedIn,
  articles,
  searchStatus,
  onSearch,
  onSignInClick,
  onLogout,
  onSaveToggle,
  isSaved,
}) {
  return (
    <>
      <div className="main-hero">
        <Header
          isLoggedIn={isLoggedIn}
          onSignInClick={onSignInClick}
          onLogout={onLogout}
        />
        <section className="main-hero__search">
          <h1 className="main-hero__title">What&apos;s going on in the world?</h1>
          <p className="main-hero__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm
            onSearch={onSearch}
            isLoading={searchStatus === "loading"}
          />
        </section>
      </div>
      <main className="main">
        <SearchResults
          status={searchStatus}
          articles={articles}
          isLoggedIn={isLoggedIn}
          onSaveToggle={onSaveToggle}
          isSaved={isSaved}
        />
        <About />
      </main>
    </>
  );
}

export default Main;
