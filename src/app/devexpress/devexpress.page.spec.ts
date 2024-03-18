import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DevexpressPage } from './devexpress.page';

describe('DevexpressPage', () => {
  let component: DevexpressPage;
  let fixture: ComponentFixture<DevexpressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DevexpressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
