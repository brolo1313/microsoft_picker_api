import { Injectable } from '@angular/core';
import * as Msal from '@azure/msal-browser';
import { msalConfig } from '../configs/msal-config';

@Injectable({
  providedIn: 'root',
})
export class MsalService {
  private msalInstance: Msal.PublicClientApplication;

  private tokenResponse: any;
  constructor() {
    // Ініціалізація MSAL
    this.msalInstance = new Msal.PublicClientApplication(msalConfig);

    // Додаткові налаштування, якщо потрібно, наприклад, для автентифікації
    this.msalInstance.initialize().then(() => {
      console.log('MSAL initialized successfully');
    }).catch((error) => {
      console.log('MSAL initialization failed:', error);
    });
  }

  async login() {
    if (!this.msalInstance.getAllAccounts().length) {
      this.msalInstance
        .loginPopup({
          scopes: ['User.Read', 'Files.Read.All'],
        })  // Використовуємо попап для логіну
        .then((response) => {
          console.log('Logged in successfully:', response);
          console.log('this.msalInstance', this.msalInstance);
        })
        .catch((error) => {
          console.log('Login failed:', error);
        });
    }
  }

  async fetchToken() {
    try {
      const account = this.getAccount();
      if (!account) {
        console.error('No active account found');
        return null;
      }

      console.log('Account found:', account);
      // const acquiredToken = await this.msalInstance.acquireTokenSilent({
      //   // scopes: ["openid", "profile"]
      //   scopes: ['User.Read', 'Files.Read.All'], // Scopes required for OneDrive
      //   // scopes : ['User.Read', 'Files.Read', 'Files.ReadWrite', 'Files.Read.All', 'Files.ReadWrite.All'],
      //   account: account,
      // });
      // this.tokenResponse = acquiredToken;
      return account;
    } catch (error) {
      console.error('Error acquiring token:', error);
      return null;
    }
  }
  

  getAccount() {
    const accounts = this.msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;

  }

  logout() {
    const account = this.getAccount();
    if (account) {
      this.msalInstance.logoutPopup().then(() => {
        console.log('Logged out successfully');
      }).catch((error) => {
        console.log('Logout failed', error);
      });
    }
  }
}
