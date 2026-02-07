/**
 * ⚡ FEATURES: forwardRef, useRef (from parent)
 *
 * forwardRef lets a parent component get a ref to a DOM element
 * inside this child component. The parent can then call
 * searchBarRef.current.focus() to programmatically focus the input.
 *
 * In React 19, forwardRef is no longer needed — ref becomes a
 * regular prop. See the React 19 app for the simplified version.
 */
import { forwardRef } from 'react';

const SearchBar = forwardRef(function SearchBar(
  { value, onChange, filterPriority, onFilterChange },
  ref
) {
  return (
    <div className="toolbar">
      <input
        ref={ref}
        type="text"
        className="search-input"
        placeholder="Search tasks…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <select
        className="filter-select"
        value={filterPriority}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">All Priorities</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>
    </div>
  );
});

export default SearchBar;

