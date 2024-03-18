import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevexpressPageRoutingModule } from './devexpress-routing.module';

import { DevexpressPage } from './devexpress.page';
import dxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevexpressPageRoutingModule,
    DxDataGridModule
  ],
  declarations: [DevexpressPage]
})
export class DevexpressPageModule {}
