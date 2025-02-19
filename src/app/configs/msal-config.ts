export const msalConfig = {
    auth: {
      clientId: 'YOUR_CLIENT_ID', // Введіть тут свій Client ID з Azure
      authority: 'https://login.microsoftonline.com/common',
      redirectUri: 'http://localhost:4200', // URL для перенаправлення після авторизації
    },
  };
  