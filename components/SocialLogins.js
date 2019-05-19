import React from 'react';
import { Button } from 'semantic-ui-react';

const SocialLogins = props => {
  return (
    <div className="socials">
      <p>or sign in with</p>
      <Button
        onClick={() => props.login('facebook')}
        color="facebook"
        circular
        icon="facebook"
        disabled={props.disabled}
      />
      <Button
        onClick={() => props.login('twitter')}
        color="twitter"
        circular
        icon="twitter"
        disabled={props.disabled}
      />
      <Button
        onClick={() => props.login('google')}
        style={{ background: '#db4437', color: 'white' }}
        className="google"
        circular
        icon="google"
        disabled={props.disabled}
      />
      <style jsx>{`
        .socials {
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default SocialLogins;
