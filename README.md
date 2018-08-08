# React Google Login

Get users into your apps quickly and securely, using a registration system they already use and trust -- their Google account with React

```bash
npm install @iddan/react-google-login
```

_or_

```bash
yarn add @iddan/react-google-login
```

### Features

 * Renders Google's official button
 * Offers a safe wrapper around Google's JS API
 * Triggers onSuccess for silent and active login

### Usage

```javascript
import GoogleLoginButton, { Auth } from '@iddan/react-google-login';

const authInstance = Auth.init({
  clientId: GOOGLE_CLIENT_ID
});

<GoogleLoginButton
  authInstance={authInstance}
  onSuccess={handleSuccess}
/>
```

[Obtain a Google Client ID](https://developers.google.com/identity/sign-in/web/sign-in#before_you_begin)

### Prior Art

  * [react-google-login](https://www.npmjs.com/package/react-google-login)
