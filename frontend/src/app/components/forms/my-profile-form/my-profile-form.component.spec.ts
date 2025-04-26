import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileFormComponent } from './my-profile-form.component';

describe('MyProfileFormComponent', () => {
  let component: MyProfileFormComponent;
  let fixture: ComponentFixture<MyProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
