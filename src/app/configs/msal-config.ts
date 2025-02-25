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
      //  'https://graph.microsoft.com/Files.ReadWrite.All'
      "https://graph.microsoft.com/.default"
    ],
  },
};
