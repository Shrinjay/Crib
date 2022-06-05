import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBlockComponent } from './city-block.component';

describe('CityBlockComponent', () => {
  let component: CityBlockComponent;
  let fixture: ComponentFixture<CityBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
