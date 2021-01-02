import React from 'react';
import GlobalContextProvider from './src/context/Provider';

import {
  getSessionPassword,
  getQueryPassword,
  isProtectedPage,
} from './src/utils/utils';
import PasswordProtect from './src/components/passwordProtect';

const password = process.env.GATSBY_PASSWORD;
const partialMatching = true;
const pagePaths = ['/cms'];

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>;
};

export const wrapPageElement = ({ props }) => {
  const { location } = props;

  // password protection disabled
  if (!password) {
    return;
  }

  // page-level protection
  const isPageLevelProtectionOn = pagePaths && pagePaths.length > 0;
  if (isPageLevelProtectionOn) {
    // non-protected page
    if (!isProtectedPage(location, pagePaths, partialMatching)) {
      return;
    }
  }

  // correct password
  const passwordCandidate = getQueryPassword(location) || getSessionPassword();
  if (passwordCandidate === password) {
    return;
  }

  // check password
  return <PasswordProtect />;
};
