import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneDrivePickerComponent } from './one-drive-picker/one-drive-picker.component';

const routes: Routes = [
  {
    path: '',
    component: OneDrivePickerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
