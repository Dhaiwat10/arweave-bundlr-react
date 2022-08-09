import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useBalance } from './hooks';

const Home: NextPage = () => {
  const { balance } = useBalance();

  useEffect(() => {
    console.log({ balance });
  }, [balance]);

  return (
    <div className={styles.container}>
      <ConnectButton />
    </div>
  );
};

export default Home;
