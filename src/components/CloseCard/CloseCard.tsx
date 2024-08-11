'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './close-card.module.css';

const CloseCard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clickCloseModal = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');

    router.push(`?${params.toString()}`);
  };
  return (
    <button
      className={styles['cardItemBtn']}
      onClick={clickCloseModal}
    ></button>
  );
};
export default CloseCard;
