import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelviewusersPageRoutingModule } from './levelviewusers-routing.module';

import { LevelviewusersPage } from './levelviewusers.page';
import dxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelviewusersPageRoutingModule,
    DxDataGridModule
  ],
  declarations: [LevelviewusersPage]
})
export class LevelviewusersPageModule {}
