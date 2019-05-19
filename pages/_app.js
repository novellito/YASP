import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';
import Head from 'next/head';
import Navbar from '../components/Navbar';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <>
        <Head>
          <title>Yet Another Starter Pack</title>
          <meta name="description" content="Boilerplate login application" />
          <link
            rel="stylesheet"
            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
          />
          <style jsx global>{`
            .ui.menu {
              border-radius: 0;
            }
          `}</style>
        </Head>
        <Container>
          <Provider store={reduxStore}>
            <Navbar />
            <Component {...pageProps} />
          </Provider>
        </Container>
      </>
    );
  }
}

export default withReduxStore(MyApp);
