import React from 'react';
import Link from 'next/link';
import styles from '@/styles/UserCard.module.css';

function UserCard({ user }) {
  return (
    <Link href={`/user/${user.id}`} className={styles.userCard}>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
    </Link>
  );
}

export default React.memo(UserCard);
