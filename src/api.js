// @flow

import googlePlatform from "./googlePlatform";

export type ClientConfig = (
  | { fetch_basic_profile: false, scope: string }
  | { scope?: string, fetch_basic_profile?: true }
) & {
  client_id: string,
  hosted_domain?: string,
  cookie_policy?: "single_host_origin" | "none" | string,
  openid_realm?: string,
  ux_mode?: "popup",
  ux_mode?: "redirect",
  redirect_uri?: string
};

export type InitParams = {|
  /** The app's client ID, found and created in the Google Developers Console. */
  clientId: $PropertyType<ClientConfig, "client_id">,
  /** The domains for which to create sign-in cookies. Either a URI, single_host_origin, or none. Defaults to single_host_origin if unspecified. */
  cookiePolicy?: $PropertyType<ClientConfig, "cookie_policy">,
  /** The scopes to request, as a space-delimited string. Optional if fetch_basic_profile is not set to false. */
  scope?: $PropertyType<ClientConfig, "scope">,
  /** Fetch users' basic profile information when they sign in. Adds 'profile', 'email' and 'openid' to the requested scopes. True if unspecified. */
  fetchBasicProfile?: $PropertyType<ClientConfig, "fetch_basic_profile">,
  /** The G Suite domain to which users must belong to sign in. This is susceptible to modification by clients, so be sure to verify the hosted domain property of the returned user. Use GoogleUser.getHostedDomain() on the client, and the hd claim in the ID Token on the server to verify the domain is what you expected. You must request the 'email' scope when using this parameter alongside fetch_basic_profile: false. */
  hostedDomain?: $PropertyType<ClientConfig, "hosted_domain">,
  /** Used only for OpenID 2.0 client migration. Set to the value of the realm that you are currently using for OpenID 2.0, as described in OpenID 2.0 (Migration). */
  openIDRealm?: $PropertyType<ClientConfig, "openid_realm">,
  /** The UX mode to use for the sign-in flow. By default, it will open the consent flow in a popup. Valid values are popup and redirect. */
  uxMode?: $PropertyType<ClientConfig, "ux_mode">,
  /** If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow. The default redirect_uri is the current URL stripped of query parameters and hash fragment. */
  redirectURI?: $PropertyType<ClientConfig, "redirect_uri">
|};

export interface BaseProfile {
  getEmail(): string;
  getFamilyName(): string;
  getGivenName(): string;
  getName(): string;
  getImageUrl(): string;
}

export interface AuthResponse {
  access_token: string;
  id_token: string;
  scope: string;
  expires_in: number;
  first_issued_at: number;
  expires_at: number;
}

export interface GoogleUser {
  getId(): string;
  isSignedIn(): boolean;
  getHostedDomain(): string;
  getGrantedScopes(): string;
  getBasicProfile(): BaseProfile;
  getAuthResponse(includeAuthorizationData?: boolean): AuthResponse;
  reloadAuthResponse(): Promise<AuthResponse>;
  hasGrantedScopes(scopes: string): boolean;
  grant(options: Object): void;
  grantOfflineAccess(scopes: string): void;
  disconnect(): void;
}

export interface CurrentUser {
  listen((googleUser: GoogleUser) => void): void;
}

export interface AuthInstance {
  currentUser: CurrentUser;
  disconnect(): void;
  signOut(): void;
}

export interface Auth2 {
  getAuthInstance(): AuthInstance;
}

export const Auth: {
  instance: AuthInstance | null,
  init: (params: InitParams) => Promise<AuthInstance>
} = {
  instance: null,
  // DON'T USE ASYNC AWAIT HERE https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams
  init({
    scope,
    clientId,
    fetchBasicProfile,
    hostedDomain,
    cookiePolicy,
    openIDRealm,
    uxMode,
    redirectURI
  }) {
    return new Promise(resolve => {
      googlePlatform.then(gapi => {
        gapi.load("client:auth2", () => {
          gapi.client.init({}).then(() => {
            const instance = gapi.auth2.init({
              scope: scope,
              client_id: clientId,
              fetch_basic_profile: fetchBasicProfile,
              hosted_domain: hostedDomain,
              cookie_policy: cookiePolicy,
              openid_realm: openIDRealm,
              ux_mode: uxMode,
              redirect_uri: redirectURI
            });
            resolve(instance);
            this.instance = instance;
          });
        });
      });
    });
  }
};
