import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloricTargetFormComponent } from './caloric-target-form.component';

describe('CaloricTargetFormComponent', () => {
  let component: CaloricTargetFormComponent;
  let fixture: ComponentFixture<CaloricTargetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloricTargetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaloricTargetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
