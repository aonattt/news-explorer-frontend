import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Navigation({ theme, isLoggedIn, onSignInClick, onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handleEscape = (evt) => {
      if (evt.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const linkClassName = ({ isActive }) =>
    `navigation__link${isActive ? " navigation__link_active" : ""}`;

  const handleSignIn = () => {
    closeMenu();
    onSignInClick();
  };

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

  return (
    <nav
      className={`navigation navigation_theme_${theme}${
        isMenuOpen ? " navigation_menu-open" : ""
      }`}
    >
      <div className="navigation__bar">
        <Link to="/" className="navigation__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>
        <button
          type="button"
          className="navigation__toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        />
      </div>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" end className={linkClassName} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li className="navigation__item">
            <NavLink
              to="/saved-news"
              className={linkClassName}
              onClick={closeMenu}
            >
              Saved articles
            </NavLink>
          </li>
        )}
        <li className="navigation__item">
          {isLoggedIn ? (
            <button
              type="button"
              className="navigation__button navigation__button_type_logout"
              onClick={handleLogout}
            >
              {currentUser?.name}
            </button>
          ) : (
            <button
              type="button"
              className="navigation__button"
              onClick={handleSignIn}
            >
              Sign in
            </button>
          )}
        </li>
      </ul>
      <div className="navigation__overlay" onClick={closeMenu} />
    </nav>
  );
}

export default Navigation;
