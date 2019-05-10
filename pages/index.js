import Head from 'next/head';
import React from 'react';
import Landing from './landing';

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;

    return {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <Head>
          <title>Yet Another Starter Pack</title>
          <meta name="description" content="Boilerplate login application" />
        </Head>
        <Landing />
      </div>
    );
  }
}
export default Index;
