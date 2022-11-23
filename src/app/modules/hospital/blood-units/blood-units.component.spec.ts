import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodUnitsComponent } from './blood-units.component';

describe('BloodUnitsComponent', () => {
  let component: BloodUnitsComponent;
  let fixture: ComponentFixture<BloodUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodUnitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloodUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
