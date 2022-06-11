import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceRedirectComponent } from './source-redirect.component';

describe('SourceRedirectComponent', () => {
  let component: SourceRedirectComponent;
  let fixture: ComponentFixture<SourceRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
