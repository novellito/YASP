import React from 'react';
import { Button } from 'semantic-ui-react';

const SocialLogins = props => {
  return (
    <div className="socials">
      <p className="test">or sign in with</p>
      <Button
        onClick={() => props.login('facebook')}
        color="facebook"
        circular
        icon="facebook"
        disabled={props.disabled}
      />
      <Button
        color="twitter"
        circular
        icon="twitter"
        disabled={props.disabled}
      />
      <Button color="grey" circular icon="github" disabled={props.disabled} />
      <style jsx>{`
        .socials {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SocialLogins;
