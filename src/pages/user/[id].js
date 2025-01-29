import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import styles from '@/styles/UserDetails.module.css';
import Loader from '@/components/Loader';

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(id) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUser(data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading || !user) return <Loader />;

  return (
    <div className={styles.userDetailsContainer}>
      <button onClick={() => router.push('/')} className={styles.backButton}>
        &lt; Back to Dashboard
      </button>
      <div className={styles.details}>
        {user.name ? (
            <>
                <h1>{user?.name}</h1>
                <p>Email: {user?.email}</p>
                <p>Phone: {user?.phone}</p>
                <p>Website: {user?.website}</p>
                <p>Address: {`${user?.address?.street}, ${user?.address?.city}, ${user?.address?.zipcode}`}</p>
            </>
        ) : (
            <p>No data available</p>
        )}
      </div>
    </div>
  );
}
