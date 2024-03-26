import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsermodelPage } from './usermodel.page';

describe('UsermodelPage', () => {
  let component: UsermodelPage;
  let fixture: ComponentFixture<UsermodelPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsermodelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
