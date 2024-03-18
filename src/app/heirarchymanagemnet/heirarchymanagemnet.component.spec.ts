import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeirarchymanagemnetComponent } from './heirarchymanagemnet.component';

describe('HeirarchymanagemnetComponent', () => {
  let component: HeirarchymanagemnetComponent;
  let fixture: ComponentFixture<HeirarchymanagemnetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeirarchymanagemnetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeirarchymanagemnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
