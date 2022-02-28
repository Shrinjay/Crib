import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeOverviewComponent } from './crime-overview.component';

describe('CrimeOverviewComponent', () => {
  let component: CrimeOverviewComponent;
  let fixture: ComponentFixture<CrimeOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrimeOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
