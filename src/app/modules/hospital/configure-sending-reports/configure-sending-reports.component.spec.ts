import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSendingReportsComponent } from './configure-sending-reports.component';

describe('ConfigureSendingReportsComponent', () => {
  let component: ConfigureSendingReportsComponent;
  let fixture: ComponentFixture<ConfigureSendingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureSendingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureSendingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
