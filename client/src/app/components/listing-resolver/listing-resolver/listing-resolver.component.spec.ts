import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingResolverComponent } from './listing-resolver.component';

describe('ListingResolverComponent', () => {
  let component: ListingResolverComponent;
  let fixture: ComponentFixture<ListingResolverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingResolverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListingResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
