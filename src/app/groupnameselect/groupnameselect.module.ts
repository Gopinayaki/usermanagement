import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupnameselectPageRoutingModule } from './groupnameselect-routing.module';

import { GroupnameselectPage } from './groupnameselect.page';
import dxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule, DxTagBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupnameselectPageRoutingModule,
    DxDataGridModule,
    DxTagBoxModule
  ],
  declarations: [GroupnameselectPage]
})
export class GroupnameselectPageModule {}
