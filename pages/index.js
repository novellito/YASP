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
        <Landing />
      </div>
    );
  }
}
export default Index;
