import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { MsalService } from '../services/msal.service';

declare const OneDrive: any;

@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrl: './one-drive-picker.component.scss'
})
export class OneDrivePickerComponent {
  private accessToken!: string | null;
  constructor(private msalService: MsalService) {
    this.getAccessToken();
  }

  getAccessToken() {
    this.accessToken = localStorage.getItem('accessToken');
    return this.accessToken;
  }

  openPicker() {
    const userAccount = this.msalService.getAccount();

    if (!userAccount) {
      console.log('Please log in first!');
      this.msalService.login();
      return;
    }

    console.log('User account:', userAccount);
    this.getAccessToken();
    this.launchOneDrivePicker(this.accessToken);
  }


  launchOneDrivePicker(accessToken?: string | null) {
    const { clientId, oneDriveApi } = environment;

    console.log('accessToken:', accessToken);
    OneDrive.open({
      clientId,
      action: 'share', // Action for picker query,  share,  download
      accessToken: `Bearer ${accessToken}`,
      multiSelect: false,
      advanced: {
        endpointHint: oneDriveApi,
      },
      createLinkParameters: { type: 'view', scope: 'anonymous' },
      // advanced: {
      //   redirectUri: "http://localhost:4200",
      // },
      // filter:"folder,.pptx,.jpeg,.jpg",
      success: (response: any) => {
        console.log('Share response:', response);

        const shareId = response.value?.[0]?.permissions?.[0]?.shareId;

        const downloadUrl = `https://api.onedrive.com/v1.0/shares/${shareId}/root/content`;

        console.log('Download URL:', downloadUrl);
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
