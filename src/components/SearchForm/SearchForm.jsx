import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch, isLoading }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a keyword");
      return;
    }
    setError("");
    onSearch(trimmed);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <input
        className={`search-form__input${
          error ? " search-form__input_type_error" : ""
        }`}
        type="text"
        name="query"
        placeholder={error || "Enter topic"}
        value={query}
        onChange={(evt) => {
          setQuery(evt.target.value);
          setError("");
        }}
        aria-label="Search topic"
        aria-invalid={Boolean(error)}
        required
      />
      <button
        type="submit"
        className="search-form__button"
        disabled={isLoading}
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
