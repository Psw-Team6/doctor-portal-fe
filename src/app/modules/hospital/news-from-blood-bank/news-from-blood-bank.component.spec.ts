import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFromBloodBankComponent } from './news-from-blood-bank.component';

describe('NewsFromBloodBankComponent', () => {
  let component: NewsFromBloodBankComponent;
  let fixture: ComponentFixture<NewsFromBloodBankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsFromBloodBankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsFromBloodBankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
