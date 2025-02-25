import { environment } from './../../environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.clientId, // spa
    // authority: 'https://login.microsoftonline.com/8395f3ee-eeb0-4cd6-b1c6-0731ab1fa9c9',
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  authRequest: {
    scopes: [
      'openid', 'profile', 'offline_access',
      'Files.Read', 'Files.ReadWrite', 'Files.Read.All', 'Files.ReadWrite.All',
      'Sites.Read.All', 'Sites.ReadWrite.All'
    ],
  },
};
