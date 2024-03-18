import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage  {


  list = [
    { name: 'User Mangement', url: '/main-page/usercomponmentcomp'},
    { name: 'Page Management', url: '/main-page/pagemanagement'},
    { name: 'Report Management', url: '/main-page/reportmanagemnet'},
    { name: 'Heirachy Management', url: '/main-page/heirarchymanagemnet'},
    { name: 'FTP Management', url: '/main-page/fptmanagement'},
    { name: 'External Activity', url: '/main-page/externalactiviy'},
    { name: 'SMS E-Mail Config', url: '/main-page/smscongig'},
    { name: 'Support', url: '/main-page/support'},

    // { name: 'Users', url: '/main-page/form'},
    { name: 'Logout', url: '/home'},

  ];
  
  constructor() { }

  



 
}
