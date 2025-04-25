import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateResetPasswordFormComponent } from './validate-reset-password-form.component';

describe('ValidateResetPasswordFormComponent', () => {
  let component: ValidateResetPasswordFormComponent;
  let fixture: ComponentFixture<ValidateResetPasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateResetPasswordFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateResetPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
