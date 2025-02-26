import { Component } from '@angular/core';

declare const OneDrive: any;

@Component({
  selector: 'app-one-drive-picker',
  standalone: false,
  templateUrl: './one-drive-picker.component.html',
  styleUrl: './one-drive-picker.component.scss'
})
export class OneDrivePickerComponent {
  title = 'onedrive-picker';

  // 18f24b04-fc0b-49b9-9e60-b797818d090e not my client id
  launchOneDrivePicker() {
    const odOptions = {
      clientId: "18f24b04-fc0b-49b9-9e60-b797818d090e", 
      action: "share",  
      multiSelect: true, 
      advanced: {
        redirectUri: "http://localhost:4200", 
      },
      viewType: "all",

      success: (file: any) => {
        this.sendOneDriveFiles(file);
      },
      cancel: () => {
        console.log('Вибір скасовано');
      },
      error: () => {
        console.log('Помилка при виборі файлів');
      }
    };

    if (OneDrive) {
      OneDrive.open(odOptions);
    } else {
      console.error('OneDrive Picker SDK не завантажено');
    }
  }

  sendOneDriveFiles(file: any) {
    console.log('Файл обрано:', file);
  }

  loadOneDrive() {
    this.launchOneDrivePicker();
  }
}
