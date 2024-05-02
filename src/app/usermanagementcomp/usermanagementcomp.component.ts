import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { UsermodelPage } from '../usermodel/usermodel.page';
import { GroupnameselectPage } from '../groupnameselect/groupnameselect.page';
import { LevelviewPage } from '../levelview/levelview.page';
import { LevelviewusersPage } from '../levelviewusers/levelviewusers.page';
interface UserData {
  username: string;
  password: string;
  role: string;
  active: boolean;
  createdTime: string;
  createdby: string;
  designation: string;
  emailid: string;
  mobilenumber: string;
}
@Component({
  selector: 'app-usermanagementcomp',
  templateUrl: './usermanagementcomp.component.html',
  styleUrls: ['./usermanagementcomp.component.scss'],
})
export class UsermanagementcompComponent  implements OnInit {
  usernamesArray: string[] = []; // Array to hold usernames for the lookup dropdown
  selectedSegment: string = 'group';
  readonly allowedPageSizes = [5, 10, 'all'];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  usertable2: any[] = [
    {username: 'admin', password:'admin',role:'super-admin', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"},
    {username: 'supra', password:'supra@123',role:'field-operator', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"},
    // {username: 'manager', password:'manager',role:'personal', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"}
  ];
  useraccess: any[] = []; 
  grouptable: any[] = []; 
  groupaccess: any[] = [];
  users: any[] = [];
  isNewlyAddedRow: boolean = false;
  usernames!: string[];
  loggedInUserName: string | null = null; // Initialize logged-in username

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

    constructor(
      private dialog: MatDialog,
      private router: Router,
      private modalController: ModalController,
      
      ) { 

        const storedUsernames = localStorage.getItem('usernames');
        this.usernames = storedUsernames ? JSON.parse(storedUsernames) : [];

        this.updateUserAccess();
        
      }

    ngOnInit(): void {


      const filteredData = this.filterUserData();
      console.log(filteredData, 'Filtered Data');

      const storedData = localStorage.getItem('usertable2');
      if (storedData) {
        // If there's data in local storage, merge it with the constant data
        const localStorageData: UserData[] = JSON.parse(storedData); // Specify the type of localStorageData
        // Filter out duplicates
        const uniqueLocalStorageData = localStorageData.filter((item: UserData) =>
          !this.usertable2.some(user =>
            user.username === item.username && user.password === item.password
          )
        );
        // Merge unique data with the constant data
        this.usertable2 = [...this.usertable2, ...uniqueLocalStorageData];
      } else {
        // If there's no data in local storage, use the constant data alone
        this.usertable2 = [...this.usertable2];
      }

    const storedGrouptable1 = localStorage.getItem('grouptable1');
    this.grouptable = storedGrouptable1 ? JSON.parse(storedGrouptable1) : [];
   
    this.useraccess = this.usertable2.map(user => ({ username1: user.username }));
    // this.useraccess = this.userAccessService.getUserAccess();
    console.log(this.useraccess);
    // this.updateUserAccess();
    this.retrieveUsernamesFromUserAccess();

    const userStoredData = localStorage.getItem('useraccess');
    if (userStoredData) {
      this.useraccess = JSON.parse(userStoredData)
    }


    const astoredData = localStorage.getItem('groupaccess');
    if (astoredData) {
      this.groupaccess = JSON.parse(astoredData)
      console.log("group storeddata",astoredData);
      
    }

    }



    filterUserData(): any[] {
      // Retrieve the data from local storage
      const storedData = localStorage.getItem('usertable2');
      let usertable2Data: any[] = [];
    
      // Parse the stored data if it exists
      if (storedData) {
        usertable2Data = JSON.parse(storedData);
      }
    
      // Merge the static data with the data from local storage
      const mergedData = [...this.usertable2, ...usertable2Data];
    
      // Get the username of the logged-in user
      const loggedInUser = localStorage.getItem('userName');
    
      // Filter the merged data to display only rows where the 'username' matches the logged-in user
      const filteredData = mergedData.filter((user: any) => user.username === loggedInUser);
    
      return filteredData;
    }
    



    setheirachy() {
      const userStoredData = localStorage.getItem('useraccess');
      if (userStoredData) {
          this.useraccess = JSON.parse(userStoredData);
          console.log("user storeddata", userStoredData);
          const storedUsers = JSON.parse(userStoredData);
          const normalUser: any[] = [];
          const specialUserControl: any[] = [];
          const specialUserView: any[] = [];
          storedUsers.forEach((group: any) => {
              if (group.hierarchyManagementControl === true && group.hierarchyManagementView === true) {
                  specialUserControl.push(group);
                  specialUserView.push(group);
              } else if (group.hierarchyManagementControl === true) {
                  specialUserControl.push(group);
              } else if (group.hierarchyManagementView === true) {
                  specialUserView.push(group);
              } else {
                  normalUser.push(group);
              }
          });
          console.log("Special Users with Control:", specialUserControl);
          console.log("Special Users with View:", specialUserView);
          const usernamesControl = specialUserControl.map(user => user.username1);
          const usernamesView = specialUserView.map(user => user.username1);
          console.log("Usernames with Control:", usernamesControl);
          console.log("Usernames with View:", usernamesView);
          localStorage.setItem("hierarchyUsersControl", JSON.stringify(usernamesControl));
          localStorage.setItem("hierarchyUsersView", JSON.stringify(usernamesView));
  
          window.location.reload();
      }
  }
  

    onEditorPreparing(e:any) {
        if (e.parentType === 'dataRow' && e.dataField === 'password') {
          e.editorOptions.mode = 'password'; // Set the editor mode to 'password'
        }
      }

      onInitNewRow(event: any) {
        // Set the default value for the "active" property to true for new rows
        event.data.active = true;

        // Get the current date and time
        const currentDate = new Date();

        // Format the date and time as "dd-mm-yyyy HH:MM:SS"
        const formattedDate = this.formatDate(currentDate);

        // Set the formatted date and time to the "createdTime" property
        event.data.createdTime = formattedDate;
        this.updateUserAccess();
    }

      onRowInserted(event: any) {
        let data = event.data;  
        data.createdby=localStorage.getItem('userName');
        console.log(data)
        console.log(event,this.usertable2)
        this.updateUserAccess(); // Update user access information when a new user is added
        this.saveDataToLocalStorage();

      }

      onRowUpdated(event: any) {
        console.log(event)
      
        this.updateUserAccess(); 
        this.saveDataToLocalStorage();
      }

      onrowdeleted(event: any) {
        const deletedUserName = event.data.username; // Assuming 'username' is the field in the row representing the user name
        
        // Delete the user from usertable2
        this.usertable2 = this.usertable2.filter(item => item.username !== deletedUserName);
        
     
        
        // Update the useraccess table to remove the deleted user's username
        this.useraccess = this.useraccess.filter(user => user.username1 !== deletedUserName);
        
        // Update local storage to reflect the changes in useraccess
        localStorage.setItem('useraccess', JSON.stringify(this.useraccess));
    
        console.log(this.usertable2);
        console.log(this.useraccess);
        this.saveDataToLocalStorage();
    }
    

      saveDataToLocalStorage() {
        const dataToSave = JSON.stringify(this.usertable2);
        localStorage.setItem('usertable2', dataToSave);
      }

  
      SelectSegment(e:any){ 
      }
      
      onrowupdateuseraccesstable(event: any) {
        const updatedData = event.data; // Assuming event.data contains the updated row data
        const username = updatedData.username1;
      
        // Find the index of the object in the useraccess array based on the username
        const index = this.useraccess.findIndex(item => item.username1 === username);
      
        // If the username exists in the useraccess array
        if (index !== -1) {
          // Update the existing entry with the new data
          this.useraccess[index] = {
            ...this.useraccess[index], // Keep existing properties
            ...updatedData // Add additional properties from updatedData
          };
      
          // Save the updated useraccess array to localStorage
          localStorage.setItem('useraccess', JSON.stringify(this.useraccess));
      
          console.log('Updated useraccess:', this.useraccess);
      
          this.setheirachy(); // Call any additional function if needed
        } else {  
          console.log(`User with username '${username}' not found in useraccess array.`);
        }
      }
      

      
      updateUserAccess() {
        // Extract usernames from the usertable2 array
        const usernames = this.usertable2.map(user => user.username);
    
        // Save usernames to local storage under the key 'usernames'
        localStorage.setItem('usernames', JSON.stringify(usernames));
    
        // Retrieve existing user access data from local storage
        const existingUserAccess = localStorage.getItem('useraccess');
        console.log(existingUserAccess, 'existingUserAccess');
    
        // Parse existing user access data or initialize an empty array if no data exists
        const existingUserAccessData = existingUserAccess ? JSON.parse(existingUserAccess) : [];
    
        // Merge existing user access data with new data, avoiding duplicates
        const mergedUserAccess = existingUserAccessData.slice(); // Create a shallow copy
        usernames.forEach(username => {
            // Check if username already exists in mergedUserAccess
            const exists = mergedUserAccess.some((user: any) => user.username1 === username);
            if (!exists) {
                // Add username to mergedUserAccess if it doesn't already exist
                mergedUserAccess.push({ username1: username });
            }
        });  
  
        // Save merged user access data back to local storage
        localStorage.setItem('useraccess', JSON.stringify(mergedUserAccess));
    
        // Set the useraccess variable to the merged data
        this.useraccess = mergedUserAccess;
    
        console.log(mergedUserAccess, 'Merged useraccess data');
    }

    
            retrieveUsernamesFromUserAccess() {
              // Assuming useraccess is your data source containing usernames
              // Extract usernames from useraccess and populate usernamesArray
              this.usernamesArray = this.usertable2.map(user => user.username);
            }

          onDeleteUser(username: string) {
            // Remove the deleted username from assignedUsers arraytt
            this.usernamesArray = this.usernamesArray.filter(user => user !== username);
          }

          onInitRowForGroupTable(event:any){

          // Set the default value for the "active" property to true for new rows
          event.data.active = true;

          // Get the current date and time
          const currentDate = new Date();

          // Format the date and time as "dd-mm-yyyy HH:MM:SS"
          const formattedDate = this.formatDate(currentDate);

          // Set the formatted date and time to the "createdTime" property
          event.data.createdTime = formattedDate;
          this.grouptablesave();
          let data = event.data;  
          data.createdby=localStorage.getItem('userName');
          console.log(data)
          }


          onRowInsertedForGroupTable(event:any){
          console.log(event)
          this.grouptablesave();
          this.saveGroupNameToLocalStorage(); 
          this.isNewlyAddedRow = true;
          }

          onRowUpdatingForGroupTable(event:any){
            console.log(event)
            this.grouptablesave();
            this.saveGroupNameToLocalStorage();      
          }

          onRowRemovingForGroupTable(event: any) {
            // Log the event object to the console for debugging
            console.log(event, this.grouptable);
            
            // Remove the row from the data source (assuming grouptable is an array)
            const rowIndex = this.grouptable.findIndex((item: any) => item === event.data);
            
            if (rowIndex !== -1) {
                this.grouptable.splice(rowIndex, 1);
                
                // Save the updated data to local storage
                this.grouptablesave();
                
                // Remove the group from groupaccess
                const rowGrpAccessIndex = this.groupaccess.findIndex((item: any) => item.groupname1 === event.data.groupname);
                if (rowGrpAccessIndex !== -1) {
                    this.groupaccess.splice(rowGrpAccessIndex, 1);
                    localStorage.setItem('groupaccess', JSON.stringify(this.groupaccess));
                }
                
                // Optionally, you may want to log a message to indicate successful deletion
                console.log("Row deleted successfully.");
            } else {
                console.error("Error: Row not found in data source.");
            }
        }
        
          grouptablesave() {
            localStorage.setItem('grouptable1', JSON.stringify(this.grouptable));
          }
          
          customizeColumns(columns: any) {
            const customColumn = {
              caption: 'Assigned Users', // Caption for the column header
              cellTemplate: 'customCellTemplate',
              cssClass: 'custom-column-header' // Specifies a custom cell template for the column
            };

            columns.unshift(customColumn);

            const customColumn2 = {
              caption: 'Assigned Levels', // Caption for the column header
              cellTemplate: 'customCellTemplatelevels',
              cssClass: 'custom-column-header' // Specifies a custom cell template for the column
            };

            columns.unshift(customColumn2);

            // Update local storage with the customized columns
          }


          customizegroupColumns(columns: any) {
              const groupselectname = {
                caption: 'Assigned Group ', // Caption for the column header
                cellTemplate: 'customCellTemplategroup',
                  // fixed: true
                // Specifies a custom cell template for the column

              };
              

              const groupselectname2 = {
                caption: 'Assigned Levels ', // Caption for the column header
                cellTemplate: 'customCellTemplatelevels',
                // Specifies a custom cell template for the column

              };

              columns.unshift(groupselectname2);
              columns.push(groupselectname);
          }

        onCellClick(e: any) {
          console.log('Cell Clicked:', e.data);
        }


        openDialogroup(data:any) {
          const name=data.row.data.username;
          console.log('Editing row:', data, name);
            // Open your dialog here
            this.dialog.open(GroupnameselectPage, {
                width: '40%', // Set the width of the dialog
                height: '60%', // Set the height of the dialog
                // You can add other options like data, panelClass, etc.
                data: {
                  username: name,
                },
            });

            const dataFromLocalStorage = localStorage.getItem('dataSource');
            if (dataFromLocalStorage) {
              const groups = JSON.parse(dataFromLocalStorage);

              const gggg = [];
              groups.forEach((element:any) => {

                if(element.Tags==name){
                  console.log(element.groupname)

                  localStorage.setItem("groupdatasource",element.groupname)
                }
              });
            }

          }

          openDialog(data:any) {

          const name=data.row.data.groupname;
          console.log('Editing row:', data, name);

          // Open your dialog here
          this.dialog.open(UsermodelPage, {
            width: '40%', // Set the width of the dialog
            height: '60%', // Set the height of the dialog
              // You can add other options like data, panelClass, etc.
              data: {
                groupname: name,
              },
          });
        }

        openDialogforlevels(data:any){

          const name=data.row.data.groupname;
          console.log('Editing row:', data, name);
          // Open your dialog here
          this.dialog.open(LevelviewPage, {
            width: '40%', // Set the width of the dialog
            height: '60%', // Set the height of the dialog
              // You can add other options like data, panelClass, etc.
              data: {
                groupname: name,

              },
          });

        }
        
        openDialoguserlevel(data:any){

          const name=data.row.data.username;
          console.log('Editing row:', data, name);
          // Open your dialog here
          this.dialog.open(LevelviewusersPage, {
            width: '40%', // Set the width of the dialog
            height: '60%', // Set the height of the dialog
              // You can add other options like data, panelClass, etc.
              data: {
                username: name,

              },
          });

        }

        setheirachyfromGroup(){
          const userStoredData = localStorage.getItem('groupaccess');
          if (userStoredData) {
            this.groupaccess = JSON.parse(userStoredData)
            console.log("user from groups storeddata",userStoredData);
            const storedUsers = JSON.parse(userStoredData);
            const normalGrp: any[] = [];
            const specialGrp: any[] = [];
            let arrdata: any[] = [];

            storedUsers.forEach((group:any) => {
              if (group.hierarchyManagementControl === true) {
                specialGrp.push(group);
              } else {
                normalGrp.push(group);
              }
            });
            console.log("Special Users from Group:", specialGrp);

            const groupNames = specialGrp.map(group => group.groupname1);
            console.log("Group Names:", groupNames);

            const storedData = localStorage.getItem('dataofgroupnmae');
            if (storedData) {
              const parsedData = JSON.parse(storedData); 
              
              groupNames.forEach((grp:any)=>{
                const filteredData = parsedData.filter((item: { Tags: any; }) => item.Tags === grp);
                console.log('Filtered Data for', grp, ':', filteredData);
                arrdata = arrdata.concat(filteredData); // Concatenate filtered data to arrdata
              });
        
              // Remove duplicates from arrdata based on the username property
              const uniqueUsernames = [...new Set(arrdata.map(user => user.username))];
              console.log("Unique Usernames:", uniqueUsernames);

              const existingUsers = localStorage.getItem('hierarchyUsers');
              const existingUserAccess = existingUsers ? JSON.parse(existingUsers) : [];

              const mergedUserAccess = existingUserAccess.slice(); // Create a shallow copy
              uniqueUsernames.forEach(username => {
                  const exists = mergedUserAccess.some((user: any) => user === username);
                  if (!exists) {
                      mergedUserAccess.push(username);
                  }
              });
              console.log("plo",mergedUserAccess);
              localStorage.setItem("hierarchyUsers", JSON.stringify(mergedUserAccess));
          }
        }

        window.location.reload();

        }

            onRowInsertedgrpaccess(event:any){
              console.log("eve",event)
      
              const groupname = event.data.groupname1;
     
              // Find the index of the object in the groupaccess array based on the groupname
              const index = this.groupaccess.findIndex(item => item.groupname1 === groupname);
          
              // If the username exists in the useraccess array
              if (index !== -1) {
                this.groupaccess[index] = {
                  ...this.groupaccess[index], // Keep existing properties
                  ...event.data // Add additional properties from event data
                };
          
                // Save the updated useraccess array to localStorage
                localStorage.setItem('groupaccess', JSON.stringify(this.groupaccess));
          
                console.log('Updated groupaccess:', this.groupaccess);
                this.setheirachyfromGroup();
              } else {
                console.log(`Group with groupname '${groupname}' not found in groupaccess array.`);
              }
            }
      
            saveGroupNameToLocalStorage() {
              const groupNames = this.grouptable.map(group => group.groupname);
            
              localStorage.setItem('groupNames', JSON.stringify(groupNames));
            
              const existingGroupAccess = localStorage.getItem('groupaccess');
              console.log(existingGroupAccess, 'existingGroupAccess');
          
              const existingGroupAccessData = existingGroupAccess ? JSON.parse(existingGroupAccess) : [];
              console.log(existingGroupAccessData, 'existingGroupAccessData');
            
              // Merge existing groupaccess data with new data, avoiding duplicates
              const mergedGroupAccess = existingGroupAccessData.slice(); // Create a shallow copy
              groupNames.forEach(groupname => {
                  // Check if groupname already exists in mergedGroupAccess
                  const exists = mergedGroupAccess.some((group:any) => group.groupname1 === groupname);
                  if (!exists) {
                      // Add groupname to mergedGroupAccess if it doesn't already exist
                      mergedGroupAccess.push({ groupname1: groupname });
                  }
              });              
          
              localStorage.setItem('groupaccess', JSON.stringify(mergedGroupAccess));
          
              console.log(mergedGroupAccess, 'Merged groupaccess data');
              this.groupaccess = mergedGroupAccess;
          }
          
          handleRefresh() {
            window.location.reload();
  }

  } 