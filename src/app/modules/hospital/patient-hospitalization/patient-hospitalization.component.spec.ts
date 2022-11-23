import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHospitalizationComponent } from './patient-hospitalization.component';

describe('PatientHospitalizationComponent', () => {
  let component: PatientHospitalizationComponent;
  let fixture: ComponentFixture<PatientHospitalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHospitalizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientHospitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
