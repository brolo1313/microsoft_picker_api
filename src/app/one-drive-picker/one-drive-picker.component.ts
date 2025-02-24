import { environment } from './../../environments/environment';
import { Component } from '@angular/core';
import { MsalService } from '../services/msal.service';

declare const OneDrive: any;
@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrls: ['./one-drive-picker.component.scss']
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
    console.log('accessToken:', accessToken);

    if (!accessToken) {
      console.error('Access token is missing!');
      return;
    }

    const apiUrl = 'https://graph.microsoft.com/v1.0/me/drive/root/children';
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Files retrieved:', data);
        // this.processFiles(data);
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }

  // launchOneDrivePicker(accessToken?: string | null) {
  //   if (!accessToken) {
  //     console.log("No access token found.");
  //     return;
  //   }
  
  //   const { clientId, oneDriveApi } = environment;
  
  //   console.log('accessToken:', accessToken);
  
  //   OneDrive.open({
  //     clientId,
  //     action: 'query',  // 'share' or 'download' - you can choose as needed
  //     // accessToken: `Bearer ${accessToken}`, 
  //     multiSelect: false,
  //     advanced: {
  //       endpointHint: oneDriveApi,
  //     },
  //     createLinkParameters: { type: 'view', scope: 'anonymous' },
  //     success: (response: any) => {
  //       console.log('File selected:', response);
  
  //       const shareId = response.value?.[0]?.permissions?.[0]?.shareId;
  //       const fileUrl = `https://graph.microsoft.com/v1.0/shares/${shareId}/root/content`;
  
  //       console.log('Download URL:', fileUrl);
  
  //       // this.fetchOneDriveFile(fileUrl, accessToken);
  //     },
  //     cancel: () => {
  //       console.log('Picker was closed');
  //     },
  //     error: (error: any) => {
  //       console.error('Error in picker:', error);
  //       console.error('Full error object:', JSON.stringify(error, null, 2));
  //     },
  //   });
  // }

  processFiles(data: any) {
    if (data.value) {
      data.value.forEach((file: any) => {
        console.log('File:', file.name);
      });
    }
  }

  // async fetchOneDriveFile(fileId: string, accessToken: string | null) {
  //   console.log('🔑 fetchOneDriveFile accessToken:', accessToken);
  //   if (!accessToken) {
  //     console.error('Access token is missing!');
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/content`, {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': `Bearer ${accessToken}`,
  //       }
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status} ${response.statusText}`);
  //     }

  //     const fileBlob = await response.blob(); // Отримуємо файл як Blob
  //     console.log("✅ Файл отримано:", fileBlob);

  //     return fileBlob;
  //   } catch (error) {
  //     console.error("❌ Помилка отримання файлу:", error);
  //     return null;
  //   }
  // }

  logout() {
    const account = this.msalService.getAccount();
    if (!account) {
      console.log('No account found');
      return;
    }

    this.msalService.logout();
  }
}
