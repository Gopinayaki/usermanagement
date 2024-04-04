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
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DxButtonModule, DxDataGridModule, DxDropDownBoxModule, DxFormModule, DxListModule, DxSelectBoxModule, DxTextBoxModule, DxTreeListModule } from 'devextreme-angular';
import { PagemanagementComponent } from '../pagemanagement/pagemanagement.component';
import { InputTextModule } from 'primeng/inputtext';
import { DxiValidationRuleModule } from 'devextreme-angular/ui/nested';
import dxButton from 'devextreme/ui/button';
import { HeirarchymanagemnetComponent } from '../heirarchymanagemnet/heirarchymanagemnet.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
      MainPagePageRoutingModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatSidenavModule,
      MatToolbarModule,
      MatListModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      DxDataGridModule,
      DxTextBoxModule,
      DxButtonModule,
      InputTextModule,
      DxiValidationRuleModule,
      DxDropDownBoxModule,
      DxListModule,
      DxSelectBoxModule,
      DxButtonModule,
      DxTreeListModule,
      DxFormModule
      
    ],
  declarations: [MainPagePage,UsermanagementcompComponent,PagemanagementComponent,HeirarchymanagemnetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainPagePageModule {}
