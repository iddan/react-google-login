// @flow

import React, { PureComponent } from "react";
import type { AuthInstance, GoogleUser } from "./api";
import googlePlatform from "./googlePlatform";

type SignIn2Options = {|
  scope: string,
  width: number,
  height: number,
  longtitle: boolean,
  theme: "lignt" | "dark",
  onsuccess: (googleUser: GoogleUser) => void,
  onfailure: () => void
|};

interface SignIn2 {
  render(id: string, options?: $Shape<SignIn2Options>): void;
}

type Props = {
  authInstance: Promise<AuthInstance>,
  scope?: $PropertyType<SignIn2Options, "scope">,
  width?: $PropertyType<SignIn2Options, "width">,
  height?: $PropertyType<SignIn2Options, "height">,
  longtitle?: $PropertyType<SignIn2Options, "longtitle">,
  theme?: $PropertyType<SignIn2Options, "theme">,
  onSuccess?: $PropertyType<SignIn2Options, "onsuccess">,
  onFailure?: $PropertyType<SignIn2Options, "onfailure">
};

export default class GoogleLoginButton extends PureComponent<Props> {
  id = `google-button-${Math.random().toString(32)}`;

  componentDidMount() {
    const {
      scope,
      width,
      height,
      longtitle,
      theme,
      onSuccess,
      onFailure,
      authInstance
    } = this.props;
    googlePlatform.then(gapi => {
      gapi.load("client:signin2", () => {
        const signin2: SignIn2 = gapi.signin2;
        authInstance.then(({ currentUser }) => {
          currentUser.listen((user: GoogleUser) => {
            if (user.isSignedIn() && onSuccess) {
              onSuccess(user);
            }
          });
          signin2.render(this.id, {
            scope,
            width,
            height,
            longtitle,
            theme,
            onsuccess: onSuccess,
            onfailure: onFailure
          });
        });
      });
    });
  }

  render() {
    return <span id={this.id} />;
  }
}
