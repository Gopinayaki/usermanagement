import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomaddPageRoutingModule } from './customadd-routing.module';

import { CustomaddPage } from './customadd.page';
import { DxDataGridModule, DxFormModule, DxSelectBoxModule, DxTagBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { DxoItemModule } from 'devextreme-angular/ui/nested';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomaddPageRoutingModule,
    DxDataGridModule,
    DxFormModule,
    DxoItemModule,
    DxTagBoxModule,
    DxTextBoxModule,
    DxSelectBoxModule
  ],
  declarations: [CustomaddPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class CustomaddPageModule {}
