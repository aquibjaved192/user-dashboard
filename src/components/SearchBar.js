import styles from '@/styles/SearchBar.module.css';

export default function SearchBar({ searchQuery, setSearchQuery, cityFilter, setCityFilter, clearFilters, users }) {
  const uniqueCities = [...new Set(users.map((user) => user.address.city))];

  return (
    <div className={styles.filterBar}>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name..."
        className={styles.searchInput}
      />
      <select
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
        className={styles.filterDropdown}
      >
        <option value="All">All Cities</option>
        {uniqueCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <button className={styles.clearFiltersButton} onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  );
}
