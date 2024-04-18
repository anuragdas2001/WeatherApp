import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";

const SearchComponent = ({ data, onSearch }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (dt) =>
            dt.ascii_name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.ascii_name;

  const renderSuggestion = (suggestion) => (
    <div className="text-left bg-slate-300 p-1 rounded-sm opacity-100 hover:bg-teal-400">
      {suggestion.ascii_name}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setSearch(newValue);
    onSearch(newValue);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setSearch(suggestion.ascii_name);
    onSearch(suggestion.ascii_name);
  };

  const inputProps = {
    placeholder: "Search for a city...",
    value: search,
    onChange: onChange,
    className:
      "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  };

  return (
    <div className="relative h-10">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
        className="absolute top-10 z-10 w-full border-2 border-blue-600 rounded-md"
      />
    </div>
  );
};
export default SearchComponent;
