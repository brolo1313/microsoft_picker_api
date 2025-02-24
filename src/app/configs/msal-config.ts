import { environment } from './../../environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.clientId, // spa
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
