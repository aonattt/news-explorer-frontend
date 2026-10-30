import {
  newsApiBaseUrl,
  newsApiKey,
  PAGE_SIZE,
  SEARCH_PERIOD_DAYS,
} from "./constants";

const toIsoDate = (date) => date.toISOString().slice(0, 10);

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(new Error(`Error: ${res.status}`));
}

export function getNews(query) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - SEARCH_PERIOD_DAYS);

  const params = new URLSearchParams({
    q: query,
    apiKey: newsApiKey,
    from: toIsoDate(from),
    to: toIsoDate(to),
    pageSize: PAGE_SIZE,
  });

  return fetch(`${newsApiBaseUrl}?${params}`).then(checkResponse);
}
