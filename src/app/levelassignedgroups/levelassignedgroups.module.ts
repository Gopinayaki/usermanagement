import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelassignedgroupsPageRoutingModule } from './levelassignedgroups-routing.module';

import { LevelassignedgroupsPage } from './levelassignedgroups.page';
import { DxDataGridModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelassignedgroupsPageRoutingModule,
    DxDataGridModule,
    DxTagBoxModule,
    DxSelectBoxModule
  ],
  declarations: [LevelassignedgroupsPage]
})
export class LevelassignedgroupsPageModule {}
