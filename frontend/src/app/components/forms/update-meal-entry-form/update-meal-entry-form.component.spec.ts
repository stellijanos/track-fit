import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMealEntryFormComponent } from './update-meal-entry-form.component';

describe('UpdateMealEntryFormComponent', () => {
  let component: UpdateMealEntryFormComponent;
  let fixture: ComponentFixture<UpdateMealEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMealEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMealEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
