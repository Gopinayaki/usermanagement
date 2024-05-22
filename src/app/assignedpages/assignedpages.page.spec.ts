import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedpagesPage } from './assignedpages.page';

describe('AssignedpagesPage', () => {
  let component: AssignedpagesPage;
  let fixture: ComponentFixture<AssignedpagesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignedpagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
