import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermanagementPageRoutingModule } from './usermanagement-routing.module';

import { UsermanagementPage } from './usermanagement.page';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermanagementPageRoutingModule,
    DxDataGridModule
  ],
  declarations: [UsermanagementPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class UsermanagementPageModule {}
