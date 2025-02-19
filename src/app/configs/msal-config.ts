export const msalConfig = {
  auth: {
    clientId: '3aa59b9e-5bf4-4d0c-8834-c9b7987e7e5e', // spa
    // clientId: 'bf778942-64c1-4509-82a5-e6f59821e4e5',
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: 'http://localhost:4200',
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  },
  authRequest: {
    scopes: ['User.Read', 'Files.Read.All'], // Потрібні scope
  },
};
