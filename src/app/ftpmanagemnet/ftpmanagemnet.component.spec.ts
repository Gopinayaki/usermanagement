import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FtpmanagemnetComponent } from './ftpmanagemnet.component';

describe('FtpmanagemnetComponent', () => {
  let component: FtpmanagemnetComponent;
  let fixture: ComponentFixture<FtpmanagemnetComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FtpmanagemnetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FtpmanagemnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
