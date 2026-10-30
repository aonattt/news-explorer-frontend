import "./Header.css";
import Navigation from "../Navigation/Navigation";

function Header({ theme = "dark", isLoggedIn, onSignInClick, onLogout }) {
  return (
    <header className={`header header_theme_${theme}`}>
      <Navigation
        theme={theme}
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onLogout={onLogout}
      />
    </header>
  );
}

export default Header;
