import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavbarLayoutComponent } from './top-navbar-layout.component';

describe('TopNavbarLayoutComponent', () => {
  let component: TopNavbarLayoutComponent;
  let fixture: ComponentFixture<TopNavbarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopNavbarLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopNavbarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
