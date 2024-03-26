import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MainPagePageModule } from './main-page/main-page.module';
import { UsermanagementPageModule } from './usermanagement/usermanagement.module';
import { DxDataGridModule, DxDropDownBoxModule, DxTextBoxModule } from 'devextreme-angular';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      MatIconModule,
      MatSidenavModule,
      UsermanagementPageModule,
      DxDataGridModule,  
      MainPagePageModule,
      DxTextBoxModule,
      DxDropDownBoxModule,
      MatToolbarModule,
      MatButtonModule,
      NgSelectModule
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],

})
export class AppModule {}
