import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '../services/msal.service';

declare const OneDrive: any;

@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrl: './one-drive-picker.component.scss'
})
export class OneDrivePickerComponent {
  constructor(private msalService: MsalService) { }

  openPicker() {
    const userAccount = this.msalService.getAccount();

    if (!userAccount) {
      console.log('Please log in first!');
      this.msalService.login();
      return;
    }

    console.log('User account:', userAccount);
    this.launchOneDrivePicker(userAccount?.idToken);
  }


  launchOneDrivePicker(accessToken?: string) {
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
        
      // Отримуємо shareId з відповіді
      const shareId = response.value?.[0]?.permissions?.[0]?.shareId;

      // Формуємо посилання для скачування
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
// https://api.onedrive.com/v1.0/shares/u!aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kNzI4N2Y2MmUxMzA5NGYyL0VmS1VNT0ZpZnlnZ2dOZENBd0FBQUFBQlh5NEk3Mkl1ZzI0UnlReUl4V016WWc/root/content
  logout() {
    const account = this.msalService.getAccount();
    if (!account) {
      console.log('No account found');
      return;
    }

    this.msalService.logout();

  }
}
