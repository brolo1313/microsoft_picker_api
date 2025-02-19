import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OneDrivePickerComponent } from './one-drive-picker/one-drive-picker.component';
import { MsalService } from './services/msal.service';

@NgModule({
  declarations: [
    AppComponent,
    OneDrivePickerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [MsalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
