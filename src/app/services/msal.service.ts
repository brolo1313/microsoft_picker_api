import { Injectable } from '@angular/core';
import * as Msal from '@azure/msal-browser';
import { msalConfig } from '../configs/msal-config';

@Injectable({
  providedIn: 'root',
})
export class MsalService {
  public msalInstance: Msal.PublicClientApplication;

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
          scopes: [
            'Files.Read',
            'Files.ReadWrite',
            'Files.Read.All',
            'Files.ReadWrite.All',
          ],
        })
        .then((response) => {
          localStorage.setItem('accessToken', response.accessToken);
          console.log('Logged in successfully:', response);
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

  // async getAccessToken() {
  //   try {
  //     const accounts = this.msalInstance.getAllAccounts();
  //     if (accounts.length === 0) {
  //       console.error("❌ Користувач не авторизований");
  //       return null;
  //     }
  
  //     const tokenResponse = await this.msalInstance.acquireTokenSilent({
  //       account: accounts[0],
  //       scopes: ["Files.Read.All", "Files.ReadWrite.All"], // Склопи для доступу до OneDrive
  //     });
  
  //     return tokenResponse.accessToken;
  //   } catch (error) {
  //     console.error("❌ Помилка отримання токена:", error);
  //     return null;
  //   }
  // }
  

  logout() {
    const account = this.getAccount();
    if (account) {
      this.msalInstance.logoutPopup().then(() => {
        console.log('Logged out successfully');
        localStorage.clear();
      }).catch((error) => {
        console.log('Logout failed', error);
      });
    }
  }
}
