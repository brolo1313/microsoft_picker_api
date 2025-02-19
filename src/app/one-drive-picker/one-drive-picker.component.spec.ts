import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDrivePickerComponent } from './one-drive-picker.component';

describe('OneDrivePickerComponent', () => {
  let component: OneDrivePickerComponent;
  let fixture: ComponentFixture<OneDrivePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneDrivePickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDrivePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
