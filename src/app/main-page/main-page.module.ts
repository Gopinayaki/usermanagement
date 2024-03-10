import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPagePageRoutingModule } from './main-page-routing.module';

import { MainPagePage } from './main-page.page';
import { UsermanagementcompComponent } from '../usermanagementcomp/usermanagementcomp.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPagePageRoutingModule,
    MatToolbarModule,
     MatButtonModule,
      MatIconModule  ],
  declarations: [MainPagePage,UsermanagementcompComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class MainPagePageModule {}
