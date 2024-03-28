import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GroupnameselectPage } from './groupnameselect.page';

describe('GroupnameselectPage', () => {
  let component: GroupnameselectPage;
  let fixture: ComponentFixture<GroupnameselectPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GroupnameselectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
