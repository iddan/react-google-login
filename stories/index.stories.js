import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import GoogleLoginButton, { Auth } from "../src";

storiesOf("GoogleLoginButton", GoogleLoginButton).add(
  "GoogleLoginButton",
  () => {
    const authInstance = Auth.init({
      clientId:
        "1034115012247-5ld35lshr95jrg9uhk4b65md25agrfne.apps.googleusercontent.com"
    });
    const handleDisconnect = () => {
      authInstance.then(auth => {
        auth.disconnect();
        auth.signOut();
      });
    };
    return (
      <React.Fragment>
        <GoogleLoginButton
          authInstance={authInstance}
          onSuccess={action("success")}
        />
        <button onClick={handleDisconnect}>Disconnect</button>
      </React.Fragment>
    );
  }
);
