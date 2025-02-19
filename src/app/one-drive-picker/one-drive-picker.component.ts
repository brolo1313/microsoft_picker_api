import { Component, OnInit } from '@angular/core';
import { MsalService } from '../services/msal.service';

const LIBRARY_URL = 'https://js.live.net/v7.2/OneDrive.js';

declare const OneDrive: any; // Декларація OneDrive SDK

@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrl: './one-drive-picker.component.scss'
})
export class OneDrivePickerComponent implements OnInit {
  constructor(private msalService: MsalService) { }

  ngOnInit() {
    const script = document.createElement('script');
    script.src = LIBRARY_URL;
    script.onload = () => {
      console.log('OneDrive SDK loaded');
    };
    document.body.appendChild(script);
  }

  openPicker() {
    const account = this.msalService.getAccount();
    if (!account) {
      console.log('Please login first!');
      this.msalService.login();
      return;
    }

    console.log('OneDrive', OneDrive);
    console.log('account', account);
   
    
    OneDrive.open({
      clientId: '',
      action: 'share',
      // multiSelect: true,
      // advanced: {
      //   redirectUri: "http://localhost:4200",
      // },
      success: (files: any) => {
        console.log('Selected files:', files);
      },
      cancel: () => {
        console.log('Picker was closed');
      },
      error: (error: any) => {
        console.error('Error in picker:', error);
        if (error.data) {
          console.error('Error data:', error.data);
        }
        if (error.message) {
          console.error('Error message:', error.message);
        }
      },
    });
  }

  logout() {
    this.msalService.logout();
  }
}
