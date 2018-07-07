/**
 * @flow
 * Google Platform script loader
 */
import importURL from "./importURL";
export default importURL("https://apis.google.com/js/platform.js").then(
  () => window.gapi
);
