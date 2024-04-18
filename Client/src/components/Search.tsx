import React, { useState } from "react";
import Autosuggest, { SuggestionsFetchRequestedParams } from "react-autosuggest";

interface SearchComponentProps {
  data: { ascii_name: string }[];
  onSearch: (searchTerm: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ data, onSearch }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<{ ascii_name: string }[]>([]);

  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter((dt) => dt.ascii_name.toLowerCase().slice(0, inputLength) === inputValue);
  };

  const onSuggestionsFetchRequested = ({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: { ascii_name: string }) => suggestion.ascii_name;

  const renderSuggestion = (suggestion: { ascii_name: string }) => (
    <div className="text-left bg-slate-300 p-1 rounded-sm opacity-100 hover:bg-teal-400">
      {suggestion.ascii_name}
    </div>
  );

  const onChange = (event:any, { newValue }: { newValue: string }) => {
    // console.log(event)
    setSearch(event.target.value);
    onSearch(newValue);
  };

  const onSuggestionSelected = (_: React.FormEvent, { suggestion }: { suggestion: { ascii_name: string } }) => {
    setSearch(suggestion.ascii_name);
    onSearch(suggestion.ascii_name);
  };

  const inputProps = {
    placeholder: "Search for a city...",
    value: search,
    onChange: onChange,
    className: "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
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
      />
    </div>
  );
};

export default SearchComponent;
