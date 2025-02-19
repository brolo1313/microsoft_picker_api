import { Component } from '@angular/core';
import { MsalService } from '../services/msal.service';

declare var OneDrive: any; // Декларація OneDrive SDK

@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrl: './one-drive-picker.component.scss'
})
export class OneDrivePickerComponent {
  constructor(private msalService: MsalService) { }

  openPicker() {
    const account = this.msalService.getAccount();
    if (!account) {
      console.log('Please login first!');
      return;
    }

    // Налаштування для OneDrive Picker
    OneDrive.open({
      clientId: 'YOUR_CLIENT_ID', // Ваш Client ID
      action: 'share',
      multiSelect: true,
      success: (files:any) => {
        console.log('Selected files:', files);
      },
      cancel: () => {
        console.log('Picker was closed');
      },
    });
  }
}
