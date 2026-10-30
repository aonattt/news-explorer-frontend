import { Link } from "react-router-dom";
import "./Footer.css";
import githubIcon from "../../images/github.svg";
import linkedinIcon from "../../images/linkedin.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        &copy; {new Date().getFullYear()} Aykut Onat, Powered by News API
      </p>
      <nav className="footer__nav">
        <ul className="footer__links">
          <li className="footer__links-item">
            <Link to="/" className="footer__link">
              Home
            </Link>
          </li>
          <li className="footer__links-item">
            <a
              href="https://tripleten.com"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              TripleTen
            </a>
          </li>
        </ul>
        <ul className="footer__socials">
          <li className="footer__socials-item">
            <a
              href="https://github.com/aonattt"
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={githubIcon} alt="GitHub" />
            </a>
          </li>
          <li className="footer__socials-item">
            <a
              href="https://www.linkedin.com/in/aykutonat/"
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="footer__icon" src={linkedinIcon} alt="LinkedIn" />
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
