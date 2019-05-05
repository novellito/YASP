import Head from 'next/head';
import Link from 'next/link';

const Index = () => (
  <div>
    <Head>
      <title>Yet Another Starter Pack</title>
      <meta name="description" content="Boilerplate login application" />
    </Head>
    <p>Welcome to YASP</p>
    <Link href="/login">
      <a>Login</a>
    </Link>
  </div>
);

export default Index;
