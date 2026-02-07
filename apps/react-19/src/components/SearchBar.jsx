/**
 * 🆕 REACT 19: ref as a regular prop
 *
 * In React 17 & 18, you needed forwardRef() to pass a ref through
 * a function component. In React 19, ref is just a regular prop —
 * no wrapper needed!
 *
 * BEFORE (React 17/18):
 *   const SearchBar = forwardRef(function SearchBar(props, ref) { … });
 *
 * AFTER (React 19):
 *   function SearchBar({ ref, ...props }) { … }
 *
 * forwardRef still works for backwards compatibility but is no
 * longer necessary.
 */

// 🆕 ref is just a regular prop now — no forwardRef wrapper!
export default function SearchBar({
  ref,
  value,
  onChange,
  filterPriority,
  onFilterChange,
}) {
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
}
