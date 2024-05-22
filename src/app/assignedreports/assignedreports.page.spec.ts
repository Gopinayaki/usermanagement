import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedreportsPage } from './assignedreports.page';

describe('AssignedreportsPage', () => {
  let component: AssignedreportsPage;
  let fixture: ComponentFixture<AssignedreportsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AssignedreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
