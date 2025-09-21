import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartloaderComponent } from './cartloader.component';

describe('CartloaderComponent', () => {
  let component: CartloaderComponent;
  let fixture: ComponentFixture<CartloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartloaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
