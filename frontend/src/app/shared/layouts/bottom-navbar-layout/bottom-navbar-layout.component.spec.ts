import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavbarLayoutComponent } from './bottom-navbar-layout.component';

describe('BottomNavbarLayoutComponent', () => {
  let component: BottomNavbarLayoutComponent;
  let fixture: ComponentFixture<BottomNavbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomNavbarLayoutComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BottomNavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
