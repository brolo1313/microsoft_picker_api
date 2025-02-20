import { Injectable } from '@angular/core';
import * as Msal from '@azure/msal-browser';
import { msalConfig } from '../configs/msal-config';

@Injectable({
  providedIn: 'root',
})
export class MsalService {
  private msalInstance: Msal.PublicClientApplication;

  constructor() {
    this.msalInstance = new Msal.PublicClientApplication(msalConfig);

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
          // scopes: ['User.Read', 'Files.Read.All'],
          scopes: [
            'Files.Read',
            'Files.ReadWrite',
            'Files.Read.All',
            'Files.ReadWrite.All',
            'Sites.Read.All',
            'Sites.ReadWrite.All'
          ],
        })
        .then((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          console.log('Logged in successfully:', response);
          console.log('this.msalInstance', this.msalInstance);
        })
        .catch((error) => {
          console.log('Login failed:', error);
        });
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
