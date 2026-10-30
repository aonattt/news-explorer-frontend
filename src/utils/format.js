export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// "Nature, Yellowstone, and 2 others" — keywords ordered by frequency.
export function formatKeywords(articles) {
  const counts = articles.reduce((acc, { keyword }) => {
    acc[keyword] = (acc[keyword] || 0) + 1;
    return acc;
  }, {});
  const keywords = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

  if (keywords.length <= 3) {
    return keywords.join(", ");
  }
  return `${keywords.slice(0, 2).join(", ")}, and ${keywords.length - 2} others`;
}

export function pluralize(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}
