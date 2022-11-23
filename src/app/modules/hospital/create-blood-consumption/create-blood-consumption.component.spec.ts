import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBloodConsumptionComponent } from './create-blood-consumption.component';

describe('CreateBloodConsumptionComponent', () => {
  let component: CreateBloodConsumptionComponent;
  let fixture: ComponentFixture<CreateBloodConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBloodConsumptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateBloodConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
