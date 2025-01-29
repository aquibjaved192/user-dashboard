import Link from 'next/link';
import styles from '@/styles/UserCard.module.css';

export default function UserCard({ user }) {
  return (
    <Link href={`/user/${user.id}`} className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </Link>
  );
}
