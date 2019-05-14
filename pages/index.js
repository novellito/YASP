import React from 'react';
import Landing from './landing';

class Index extends React.Component {
  static getInitialProps({ reduxStore, req }) {
    const isServer = !!req;
    return {};
  }

  render() {
    return (
      <div>
        <Landing />
      </div>
    );
  }
}
export default Index;
