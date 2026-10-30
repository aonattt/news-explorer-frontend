export const newsApiBaseUrl = import.meta.env.PROD
  ? "https://news-api-proxy.up.railway.app/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

export const CARDS_PER_PAGE = 3;
export const SEARCH_PERIOD_DAYS = 7;
export const PAGE_SIZE = 100;

export const SERVER_ERROR_MESSAGE =
  "Sorry, something went wrong during the request. Please try again later.";
