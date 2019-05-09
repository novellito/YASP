import Head from 'next/head';
import Link from 'next/link';

import React from 'react';
import { connect } from 'react-redux';
import { startClock, serverRenderClock } from '../store/store';

import Examples from '../components/examples';

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    // DISPATCH ACTIONS HERE ONLY WITH `reduxStore.dispatch`
    reduxStore.dispatch(serverRenderClock(isServer));

    return {};
  }

  componentDidMount() {
    // DISPATCH ACTIONS HERE FROM `mapDispatchToProps`
    // TO TICK THE CLOCK
    this.timer = setInterval(() => this.props.startClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <Head>
          <title>Yet Another Starter Pack</title>
          <meta name="description" content="Boilerplate login application" />
        </Head>
        <p>Welcome to YASP</p>
        <Examples />
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
    );
  }
}
const mapDispatchToProps = { startClock };
export default connect(
  null,
  mapDispatchToProps
)(Index);
