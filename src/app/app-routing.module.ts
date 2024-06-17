import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsermanagementcompComponent } from './usermanagementcomp/usermanagementcomp.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    loadChildren: () => import('./main-page/main-page.module').then( m => m.MainPagePageModule)
  },
  {
    path: 'devexpress',
    loadChildren: () => import('./devexpress/devexpress.module').then( m => m.DevexpressPageModule)
  },
  {
    path: 'usermodel',
    loadChildren: () => import('./usermodel/usermodel.module').then( m => m.UsermodelPageModule)
  },
  {
    path: 'groupnameselect',
    loadChildren: () => import('./groupnameselect/groupnameselect.module').then( m => m.GroupnameselectPageModule)
  },
  {
    path: 'levelassigneduser',
    loadChildren: () => import('./levelassigneduser/levelassigneduser.module').then( m => m.LevelassigneduserPageModule)
  },
  {
    path: 'levelassignedgroups',
    loadChildren: () => import('./levelassignedgroups/levelassignedgroups.module').then( m => m.LevelassignedgroupsPageModule)
  },
  {
    path: 'levelview',
    loadChildren: () => import('./levelview/levelview.module').then( m => m.LevelviewPageModule)
  },
  {
    path: 'levelviewusers',
    loadChildren: () => import('./levelviewusers/levelviewusers.module').then( m => m.LevelviewusersPageModule)
  },
  {
    path: 'assignedreports',
    loadChildren: () => import('./assignedreports/assignedreports.module').then( m => m.AssignedreportsPageModule)
  },
  {
    path: 'assignedpages',
    loadChildren: () => import('./assignedpages/assignedpages.module').then( m => m.AssignedpagesPageModule)
  },
  {
    path: 'customadd',
    loadChildren: () => import('./customadd/customadd.module').then( m => m.CustomaddPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }