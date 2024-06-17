import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomaddPage } from './customadd.page';

describe('CustomaddPage', () => {
  let component: CustomaddPage;
  let fixture: ComponentFixture<CustomaddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
