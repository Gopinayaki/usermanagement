import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgSelectOption } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsermodelPageRoutingModule } from './usermodel-routing.module';

import { UsermodelPage } from './usermodel.page';
import { NgSelectModule } from '@ng-select/ng-select';
import dxDataGrid from 'devextreme/ui/data_grid';
import { DxDataGridModule, DxTagBoxModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsermodelPageRoutingModule,
    NgSelectModule,
    DxDataGridModule,
    DxTagBoxModule,
  
  

  ],
  declarations: [UsermodelPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class UsermodelPageModule {}
