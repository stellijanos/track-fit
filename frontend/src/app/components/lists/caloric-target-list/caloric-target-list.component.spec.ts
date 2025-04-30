import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloricTargetListComponent } from './caloric-target-list.component';

describe('CaloricTargetListComponent', () => {
  let component: CaloricTargetListComponent;
  let fixture: ComponentFixture<CaloricTargetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloricTargetListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloricTargetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
