import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.page.html',
  styleUrls: ['./usermanagement.page.scss'],
})
export class UsermanagementPage implements OnInit {

  selectedSegment: string = 'user';
  readonly allowedPageSizes = [5, 10, 'all'];
  displayMode = 'full';
  useraccess: any[] = []; 
  showPageSizeSelector = true;


  showInfo = true;
  showNavButtons = true;


  usertable2: any[] = [
  
  ];
  
  dataSourcehie : any[] =[];

  constructor() { }

  ngOnInit() {

 const storedData = localStorage.getItem('usertable2');

 // Check if the data exists in localStorage
 if (storedData) {
   // Parse the JSON string to get the array data
   this.usertable2 = JSON.parse(storedData);
 }


 let useraccess:any[]=[];
 useraccess = this.usertable2.map(user => ({
  username: user.username,
  // Add default view and control fields here
  view: false,  // For example, set default view field to false
  control: true  // For example, set default control field to true
}));
//  useraccess= this.usertable2.map(user=>user.username)
 
console.log(useraccess)


this.updateUserAccess(); // Update user access information on component initialization
}
updateUserAccess() {
  this.useraccess = this.usertable2.map(user => ({
    username1: user.username,
    view: false,
    control: true
  }));
  console.log(this.useraccess); // Log updated user access information
}

  onRowInserted(event: any) {
    console.log(event)
    this.saveDataToLocalStorage();
    this.updateUserAccess(); // Update user access information when a new user is added
  }

  onRowUpdated(event: any) {
    this.saveDataToLocalStorage();
  }

  saveDataToLocalStorage() {
    const dataToSave = JSON.stringify(this.usertable2);
    localStorage.setItem('usertable2', dataToSave);
  }


  SelectSegment(e:any){ 

  }

}
