import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  loggedInUser: string | null = null; // Initialize to null
  selectedPageName: string = '';
  list = [
    { name: 'User Mangement', url: '/main-page/usercomponmentcomp', icon: 'profile-user.png'},
    { name: 'Page Management', url: '/main-page/pagemanagement', icon:'content.png'},
    { name: 'Report Management', url: '/main-page/reportmanagemnet'},
    { name: 'Heirachy Management', url: '/main-page/heirarchymanagemnet'},
    { name: 'FTP Management', url: '/main-page/fptmanagement'},
    { name: 'External Activity', url: '/main-page/externalactiviy'},
    { name: 'SMS E-Mail Config', url: '/main-page/smscongig'},
    { name: 'Support', url: '/main-page/support'},

    // { name: 'Users', url: '/main-page/form'},
    { name: 'Logout', url: '/home'},

  ];
  
  selectPage(name: string): void {
    this.selectedPageName = name;
  }

  constructor() {


    const username = localStorage.getItem('userName');
    if (username) {
      this.loggedInUser = username;
      console.log(this.loggedInUser,'loggedInUser')
    }
   }

  ngOnInit(): void {
    // Retrieve username from local storage
 
  }

}
