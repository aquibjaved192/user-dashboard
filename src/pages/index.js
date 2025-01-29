import { useState, useEffect } from 'react';
import UserCard from '@/components/UserCard';
import SearchBar from '@/components/SearchBar';
import styles from '@/styles/Dashboard.module.css';
import Loader from '@/components/Loader';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);


  useEffect(() => {
    const filterUsers = () => {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(query);
        const matchesCity = cityFilter === 'All' || user.address.city === cityFilter;
        return matchesSearch && matchesCity;
      });
      setFilteredUsers(filtered);
    };
    filterUsers();
  }, [searchQuery, cityFilter, users]);

  const clearFilters = () => {
    setSearchQuery('');
    setCityFilter('All');
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.dashboardTitle}>User Dashboard</h1>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cityFilter={cityFilter}
        setCityFilter={setCityFilter}
        clearFilters={clearFilters}
        users={users}
      />
      <div className={styles.userGrid}>
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
