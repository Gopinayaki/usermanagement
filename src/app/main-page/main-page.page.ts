import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {
  loggedInUser: string | null = null; // Initialize to null
  selectedPageName: string = '';
  ShowHierarchyAccess: boolean = false;
  usernames!: string[];

  
  list = [
    { name: 'User Management', url: '/main-page/usercomponmentcomp', icon: 'student.gif'},
    { name: 'Heirachy Management', url: '/main-page/heirarchymanagemnet' , icon: 'customer-satisfaction.gif'},
    { name: 'Page Management', url: '/main-page/pagemanagement', icon: 'checklist.gif'},
    { name: 'Report Management', url: '/main-page/reportmanagemnet', icon: 'file-delivery.gif' },
    { name: 'FTP Management', url: '/main-page/fptmanagement' , icon: 'cloud.gif'},
    { name: 'External Activity', url: '/main-page/externalactiviy' , icon: 'bowling.gif'},
    { name: 'SMS E-Mail Config', url: '/main-page/smscongig'  , icon: 'message.gif'},
    { name: 'Support', url: '/main-page/support', icon: 'customer-support.gif' },
    { name: 'Logout', url: '/home' , icon: 'logout.gif'},
  ];

  selectPage(name: string): void {
    this.selectedPageName = name;
  }

  constructor() {


    const username = localStorage.getItem('userName');
    if (username) {
      this.loggedInUser = username;
    }

  }

  ngOnInit(): void {
    // Retrieve username from local storage
    const username = localStorage.getItem('userName');
   
    // Get the hierarchy users array from localStorage
    const users = localStorage.getItem('hierarchyUsers');
    if (users && username) {
      // Parse the hierarchy users array
      const parsedUsers = users ? JSON.parse(users) : [];
      // const parsedUsers = JSON.parse(users);
      // Check if the user exists in the parsed users array
      const userExists = parsedUsers.some((u: any) => u === username);
      this.ShowHierarchyAccess = userExists;
      // If user doesn't have hierarchy access, remove the item from the list
      if (!this.ShowHierarchyAccess) {
        this.list = this.list.filter(item => item.name !== 'Heirachy Management');
      }
      console.log(this.ShowHierarchyAccess,this.list);

    } else {
      console.log("Hierarchy users data or user data is missing in localStorage.");
    }
  
    const storedUsernames = localStorage.getItem('usernames');

    this.usernames = storedUsernames ? JSON.parse(storedUsernames) : [];
  }


  ionViewDidEnter(){
    const username = localStorage.getItem('userName');
    if (username) {
      this.loggedInUser = username;
    }
  }

}
