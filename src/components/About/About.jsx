import "./About.css";
import authorImage from "../../images/author.jpg";

function About() {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Aykut Onat" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          I&apos;m Aykut Onat, a PMP-certified data engineer and project manager.
          I build data pipelines, automation and AI tools for retail and
          e-commerce, working with JavaScript, React, Node.js, Express, MongoDB,
          Python and Google Cloud.
        </p>
        <p className="about__text">
          At TripleTen I learned to build full-stack web applications, from
          responsive layouts and React components to APIs, authentication and
          deployment. I use those skills to help teams turn complex data into
          clear, fast and useful products.
        </p>
      </div>
    </section>
  );
}

export default About;
