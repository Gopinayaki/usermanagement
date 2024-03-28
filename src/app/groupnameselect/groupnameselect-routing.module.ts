import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupnameselectPage } from './groupnameselect.page';

const routes: Routes = [
  {
    path: '',
    component: GroupnameselectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupnameselectPageRoutingModule {}
