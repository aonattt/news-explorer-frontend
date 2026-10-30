import { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import InfoModal from "../InfoModal/InfoModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getNews } from "../../utils/newsApi";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchStatus, setSearchStatus] = useState("idle");
  const [savedArticles, setSavedArticles] = useState([]);

  useEffect(() => {
    const token = auth.getToken();
    if (!token) {
      setIsAuthChecked(true);
      return;
    }
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => auth.removeToken())
      .finally(() => setIsAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    api.getSavedArticles().then(setSavedArticles).catch(console.error);
  }, [isLoggedIn]);

  const openModal = useCallback((name) => {
    setAuthError("");
    setActiveModal(name);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal("");
    setAuthError("");
  }, []);

  const openLoginModal = useCallback(() => openModal("login"), [openModal]);

  const handleSearch = (query) => {
    setKeyword(query);
    setSearchStatus("loading");
    getNews(query)
      .then(({ articles: found }) => {
        const valid = found.filter(
          (article) => article.title && article.title !== "[Removed]"
        );
        setArticles(valid);
        setSearchStatus(valid.length ? "success" : "empty");
      })
      .catch(() => {
        setArticles([]);
        setSearchStatus("error");
      });
  };

  const handleLogin = (credentials) => {
    setIsSubmitting(true);
    auth
      .authorize(credentials)
      .then(({ token }) => {
        auth.setToken(token);
        return auth.checkToken(token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeModal();
      })
      .catch(() => setAuthError("Incorrect email or password"))
      .finally(() => setIsSubmitting(false));
  };

  const handleRegister = (data) => {
    setIsSubmitting(true);
    auth
      .register(data)
      .then(() => openModal("success"))
      .catch(() => setAuthError("This email is not available"))
      .finally(() => setIsSubmitting(false));
  };

  const handleLogout = () => {
    auth.removeToken();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setSavedArticles([]);
  };

  const findSaved = (article) =>
    savedArticles.find((saved) => saved.url === article.url);

  const handleDelete = (article) => {
    api
      .deleteArticle(article._id)
      .then(() =>
        setSavedArticles((prev) =>
          prev.filter((saved) => saved._id !== article._id)
        )
      )
      .catch(console.error);
  };

  const handleSaveToggle = (article) => {
    const saved = findSaved(article);
    if (saved) {
      handleDelete(saved);
      return;
    }
    api
      .saveArticle({ ...article, keyword })
      .then((newArticle) => setSavedArticles((prev) => [newArticle, ...prev]))
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/"
            element={
              <Main
                isLoggedIn={isLoggedIn}
                articles={articles}
                searchStatus={searchStatus}
                onSearch={handleSearch}
                onSignInClick={openLoginModal}
                onLogout={handleLogout}
                onSaveToggle={handleSaveToggle}
                isSaved={(article) => Boolean(findSaved(article))}
              />
            }
          />
          <Route
            path="/saved-news"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isAuthChecked={isAuthChecked}
                onUnauthorized={openLoginModal}
              >
                <SavedNews
                  articles={savedArticles}
                  onLogout={handleLogout}
                  onDelete={handleDelete}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeModal}
          onSubmit={handleLogin}
          onSwitch={() => openModal("register")}
          isSubmitting={isSubmitting}
          serverError={authError}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeModal}
          onSubmit={handleRegister}
          onSwitch={openLoginModal}
          isSubmitting={isSubmitting}
          serverError={authError}
        />
        <InfoModal
          isOpen={activeModal === "success"}
          onClose={closeModal}
          title="Registration successfully completed!"
          linkText="Sign in"
          onLinkClick={openLoginModal}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
