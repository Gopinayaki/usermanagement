import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelassignedgroupsPage } from './levelassignedgroups.page';

describe('LevelassignedgroupsPage', () => {
  let component: LevelassignedgroupsPage;
  let fixture: ComponentFixture<LevelassignedgroupsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LevelassignedgroupsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
