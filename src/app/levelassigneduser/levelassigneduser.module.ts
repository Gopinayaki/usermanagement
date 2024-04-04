import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LevelassigneduserPageRoutingModule } from './levelassigneduser-routing.module';

import { LevelassigneduserPage } from './levelassigneduser.page';
import { DxDataGridModule, DxSelectBoxModule, DxTagBoxModule } from 'devextreme-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelassigneduserPageRoutingModule,
    DxDataGridModule,
    DxTagBoxModule,
    DxSelectBoxModule
  ],
  declarations: [LevelassigneduserPage]
})
export class LevelassigneduserPageModule {}
