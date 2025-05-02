import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActivityEntryFormComponent } from './create-activity-entry-form.component';

describe('CreateActivityEntryFormComponent', () => {
  let component: CreateActivityEntryFormComponent;
  let fixture: ComponentFixture<CreateActivityEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateActivityEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateActivityEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
