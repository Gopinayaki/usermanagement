import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsermanagementPage } from './usermanagement.page';

describe('UsermanagementPage', () => {
  let component: UsermanagementPage;
  let fixture: ComponentFixture<UsermanagementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UsermanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
