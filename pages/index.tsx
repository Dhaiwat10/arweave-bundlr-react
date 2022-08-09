import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useBalance } from './hooks';

const Home: NextPage = () => {
  const { balance } = useBalance();

  console.log({ balance });

  return (
    <div className={styles.container}>
      <ConnectButton />
    </div>
  );
};

export default Home;
