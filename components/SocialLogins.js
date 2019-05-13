import React from 'react';
import { Button } from 'semantic-ui-react';

const SocialLogins = props => {
  return (
    <div className="socials">
      <p className="test">or sign in with</p>
      <Button color="facebook" circular icon="facebook" />
      <Button color="twitter" circular icon="twitter" />
      <Button color="grey" circular icon="github" />
      <style jsx>{`
        .socials {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

SocialLogins.propTypes = {};

export default SocialLogins;
