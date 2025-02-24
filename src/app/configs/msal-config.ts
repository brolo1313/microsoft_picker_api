import { environment } from './../../environments/environment';

export const msalConfig = {
  auth: {
    clientId: environment.clientId, // spa
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  authRequest: {
    scopes: ['User.Read', 'Files.Read.All'], // needed scopes
  },
};
