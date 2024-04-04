import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelassigneduserPage } from './levelassigneduser.page';

describe('LevelassigneduserPage', () => {
  let component: LevelassigneduserPage;
  let fixture: ComponentFixture<LevelassigneduserPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LevelassigneduserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
