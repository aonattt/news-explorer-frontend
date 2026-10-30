import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({ articles, ...cardProps }) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => (
        <li className="news-card-list__item" key={article._id || article.url}>
          <NewsCard article={article} {...cardProps} />
        </li>
      ))}
    </ul>
  );
}

export default NewsCardList;
