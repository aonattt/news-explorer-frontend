# News Explorer — Frontend

TripleTen final project: a news search app built with React that pulls articles from the News API and lets users save articles to their account.

**Live site:** https://aonattt.github.io/news-explorer-frontend/

## Features

- Search news from the last 7 days by keyword ([News API](https://newsapi.org/docs/endpoints/everything)), with a preloader, "Nothing found" and error states
- Results shown three at a time with a "Show more" button
- Sign up / sign in modals with client-side validation (close on ✕, overlay click or Esc)
- Save and remove articles; saved articles live on the protected `/saved-news` route, grouped by search keyword
- Responsive layout for desktop, tablet and mobile (down to 320px), including a mobile menu

## Tech

- React 18 + Vite, React Router 6
- BEM class naming, CSS per component, fonts connected with `@font-face`
- Stage 1 backend is simulated: `src/utils/auth.js` and `src/utils/api.js` stub the auth and saved-articles endpoints with `localStorage`. Any email and password (8+ characters) signs you in.

## Running locally

```bash
npm install
cp .env.example .env   # then add your News API key
npm run dev
```

In development requests go to `newsapi.org` directly (the free plan only allows `localhost`); production builds use the TripleTen proxy `https://news-api-proxy.up.railway.app/news/v2/everything`.

## Deploying

```bash
npm run deploy
```

Builds the app and publishes `dist/` to the `gh-pages` branch. `404.html` is a copy of `index.html` so routes like `/saved-news` work after a page refresh.
