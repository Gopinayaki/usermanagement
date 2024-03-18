import { Component, OnInit, ViewChild } from '@angular/core';
import { DxValidatorComponent } from 'devextreme-angular';

@Component({
  selector: 'app-usermanagementcomp',
  templateUrl: './usermanagementcomp.component.html',
  styleUrls: ['./usermanagementcomp.component.scss'],
})
export class UsermanagementcompComponent  implements OnInit {
  usernamesArray: string[] = []; // Array to hold usernames for the lookup dropdown
  selectedSegment: string = 'user';
  readonly allowedPageSizes = [5, 10, 'all'];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;

  usertable2: any[] = [];
  useraccess: any[] = []; 
  grouptable: any[] = []; 
  groupaccess: any[] = [];
  users: any[] = [];


      onInitNewRow(event: any) {
        // Set the default value for the "active" property to true for new rows
        event.data.active = true;

        // Get the current date and time
        const currentDate = new Date();

        // Format the date and time as "dd-mm-yyyy HH:MM:SS"
        const formattedDate = this.formatDate(currentDate);

        // Set the formatted date and time to the "createdTime" property
        event.data.createdTime = formattedDate;
    }

    formatDate(date: Date): string {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = this.padZero(date.getDate());
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      const hours = this.padZero(date.getHours());
      const minutes = this.padZero(date.getMinutes());
      const seconds = this.padZero(date.getSeconds());
      
      return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    }


    // Function to add leading zero to single digit numbers
    padZero(num: number): string {
        return num < 10 ? '0' + num : num.toString();
    }

    constructor() { }



    ngOnInit(): void {
this.  saveDataToLocalStorage2();
    
    // Retrieve data from local storage on component initialization
    const storedData = localStorage.getItem('usertable2');
    if (storedData) {
      this.usertable2 = JSON.parse(storedData);
    } else {
      this.usertable2 = []; // Initialize to an empty array if no data exists in local storage
    }

    this.updateUserAccess();
    this.retrieveUsernamesFromUserAccess();

  }

    onEditorPreparing(e:any) {
        if (e.parentType === 'dataRow' && e.dataField === 'password') {
          e.editorOptions.mode = 'password'; // Set the editor mode to 'password'
        }
      }


      onRowInserted(event: any) {
        
        let data = event.data;
        data.createdby=localStorage.getItem('userName');
        console.log(data)
        console.log(event,this.usertable2)
        this.saveDataToLocalStorage();
        this.updateUserAccess(); // Update user access information when a new user is added

      }

      onRowUpdated(event: any) {
        this.saveDataToLocalStorage();
        this.updateUserAccess(); 

      }


      onrowdeleted(event: any) {
        const deletedUserName = event.data.username; // Assuming 'username' is the field in the row representing the user name
        this.usertable2 = this.usertable2.filter(item => item.username !== deletedUserName);
        this.saveDataToLocalStorage(); // Save updated data to local storage
        console.log(this.usertable2);
        this.updateUserAccess(); 

    }


  saveDataToLocalStorage() {
    const dataToSave = JSON.stringify(this.usertable2);
    localStorage.setItem('usertable2', dataToSave);

  // Extract usernames and store them separately
  const usernames = this.usertable2.map(user => user.username);
  localStorage.setItem('usernames', JSON.stringify(usernames));


  }


  SelectSegment(e:any){ 

  }

  accessrowInserted(event: any) {

    let data = event.data;
    data.username1=localStorage.getItem('usernames');
    console.log(data)


    this. saveDataToLocalStorage2();
  }
  

  saveDataToLocalStorage2(){

    const dataToSave1 = JSON.stringify(this.useraccess);
    localStorage.setItem('useraccesstable',dataToSave1)
   
  }


  updateUserAccess() {
    // this.useraccess = this.usertable2.map(user => ({
    //   username1: user.username,
  
    // }));
  
   
    console.log(this.useraccess); // Log updated user access information
  }



  retrieveUsernamesFromUserAccess() {
    // Assuming useraccess is your data source containing usernames
    // Extract usernames from useraccess and populate usernamesArray
    this.usernamesArray = this.usertable2.map(user => user.username);
  }

  onDeleteUser(username: string) {
    // Remove the deleted username from assignedUsers array
    this.usernamesArray = this.usernamesArray.filter(user => user !== username);
  }


  grouptableinsertrow(event: any){
    let data = event.data;

    data.username1=localStorage.getItem('usernames');


  }
}
