import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHolidaysComponent } from './manager-holidays.component';

describe('ManagerHolidaysComponent', () => {
  let component: ManagerHolidaysComponent;
  let fixture: ComponentFixture<ManagerHolidaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerHolidaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
