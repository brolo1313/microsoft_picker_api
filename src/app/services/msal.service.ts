import { Injectable } from '@angular/core';
import * as Msal from '@azure/msal-browser';
import { msalConfig } from '../configs/msal-config';

@Injectable({
  providedIn: 'root',
})
export class MsalService {
  private msalInstance: Msal.PublicClientApplication;

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

  // Метод для логіну
  login() {
    // Переконатися, що MSAL ініціалізовано перед викликом
    if (!this.msalInstance.getAllAccounts().length) {
      this.msalInstance
        .loginPopup()  // Використовуємо попап для логіну
        .then((response) => {
          console.log('Logged in successfully:', response);
        })
        .catch((error) => {
          console.log('Login failed:', error);
        });
    }
  }

  // Перевірка, чи є увійшов користувач
  getAccount() {
    const accounts = this.msalInstance.getAllAccounts();
    return accounts.length > 0 ? accounts[0] : null;
  }

  // Логіка для виходу з системи
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
