import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LevelviewPage } from './levelview.page';

describe('LevelviewPage', () => {
  let component: LevelviewPage;
  let fixture: ComponentFixture<LevelviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LevelviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
