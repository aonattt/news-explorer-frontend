// Stage 1 stub: simulates the saved-articles backend with localStorage.
const STORAGE_KEY = "news-explorer-saved-articles";

const readArticles = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

const writeArticles = (articles) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));

const delay = (value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), 200));

export function getSavedArticles() {
  return delay(readArticles());
}

export function saveArticle(article) {
  const saved = { ...article, _id: crypto.randomUUID() };
  writeArticles([saved, ...readArticles()]);
  return delay(saved);
}

export function deleteArticle(id) {
  writeArticles(readArticles().filter((article) => article._id !== id));
  return delay({ _id: id });
}
