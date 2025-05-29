import React from "react";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = React.useState("");

  React.useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(term);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [term, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search..."
      className="border p-2 rounded w-full"
      value={term}
      onChange={(e) => setTerm(e.target.value)}
    />
  );
};

export default SearchBar;
