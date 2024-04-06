import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelviewusersPage } from './levelviewusers.page';

describe('LevelviewusersPage', () => {
  let component: LevelviewusersPage;
  let fixture: ComponentFixture<LevelviewusersPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LevelviewusersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
