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
  }

  login() {
    this.msalInstance.loginPopup().then((response) => {
      console.log('Logged in successfully:', response);
    }).catch((error) => {
      console.log('Login failed:', error);
    });
  }

  getAccount() {
    return this.msalInstance.getAllAccounts()[0];
  }
}
