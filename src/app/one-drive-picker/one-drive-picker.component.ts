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
    const userAccount = this.msalService.getAccount();

    if (!userAccount) {
      console.log('Please log in first!');
      this.msalService.login();
      return;
    }


    // Fetch the token before opening the picker
    this.msalService.fetchToken().then((data: any) => {
      if (data) {
        this.launchOneDrivePicker(data?.idToken);
        console.log('Token fetched:', data);
      }

    }).catch((error) => {
      console.error('Failed to fetch token:', error);
    });
  }


  launchOneDrivePicker(accessToken?: string) {
    console.log('OneDrive', OneDrive);
    console.log('accessToken:', accessToken);
    OneDrive.open({
      clientId: '', // SPA Client ID
      action: 'query', // Action for picker query,  share,  download
      accessToken: accessToken,
      multiSelect: false,
      advanced: {
        endpointHint: "api.onedrive.com",
      },
      // advanced: {
      //   redirectUri: "http://localhost:4200",
      // },
      // filter:"folder,.pptx,.jpeg,.jpg",
      success: (files: any) => {
        console.log('Selected files:', files);
      },
      cancel: () => {
        console.log('Picker was closed');
      },
      error: (error: any) => {
        console.error('Error in picker:', error);
        console.error('Full error object:', JSON.stringify(error, null, 2));
      },
    });
  }

  logout() {
    const account = this.msalService.getAccount();
    if (!account) {
      console.log('No account found');
      return;
    }

    this.msalService.logout();

  }
}
