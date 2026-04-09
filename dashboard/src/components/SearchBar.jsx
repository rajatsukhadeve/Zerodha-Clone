import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevents the page from reloading
    if (searchInput.trim()) {
      // Redirect to the stock dashboard route
      navigate(`/stock/${searchInput.trim().toUpperCase()}`);
      setSearchInput(""); // Clear the input field after searching
    }
  };

  return (
    <div style={{ padding: "20px 20px 0 20px" }}>
      <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search Stocks (e.g., RELIANCE, TCS)"
          style={{ padding: "10px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#387ed1", color: "white", border: "none", borderRadius: "4px" }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;