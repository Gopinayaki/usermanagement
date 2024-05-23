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
interface UseraccessData {
  username1: string;
  id: number;
  SettingsControl?: boolean;
  SettingsView?: boolean;
  externalActivityEdit?: boolean;
  externalActivityView?: boolean;
  ftpManagementControl?: boolean;
  ftpManagementView?: boolean;
  hierarchyManagementControl?: boolean;
  hierarchyManagementView?: boolean;
  reportManagementControl?: boolean;
  reportManagementView?: boolean;
  smsConfigEdit?: boolean;
  smsConfigView?: boolean;
  userManagementControl?: boolean;
  userManagementView?: boolean;
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
    {id: 0, username: 'admin', password:'admin',role:'super-admin', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "Manager", emailid: "admin@123", mobilenumber: "9876543210"},
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

        // this.updateUserAccess();
        
      }

    ngOnInit(): void {


      const filteredData = this.filterUserData();

      const storedData = localStorage.getItem('usertable2');
      console.log(storedData,filteredData, 'Filtered Data');

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
        console.log("storedData",this.usertable2)
      } else {
        // If there's no data in local storage, use the constant data alone
        this.usertable2 = [...this.usertable2];
        console.log("11:03",this.usertable2)

      }

    const storedGrouptable1 = localStorage.getItem('grouptable1');
    this.grouptable = storedGrouptable1 ? JSON.parse(storedGrouptable1) : [];
  
    this.useraccess = this.usertable2.map(user => ({ username1: user.username, id:user.id }));
    // this.useraccess = this.userAccessService.getUserAccess();
    console.log(this.useraccess);
    this.updateUserAccess();
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
        data.id = event.data.__KEY__;
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
          console.log('time',this.usertable2)

          // Extract usernames from the usertable2 array
          const usernames = this.usertable2.map(user => ({ username1: user.username, id:user.id }));

          // Save usernames to local storage under the key 'usernames'
          localStorage.setItem('usernames', JSON.stringify(usernames));
      
          // Retrieve existing user access data from local storage
          const existingUserAccess = localStorage.getItem('useraccess');
          console.log(existingUserAccess, 'existingUserAccess');
      
          // Parse existing user access data or initialize an empty array if no data exists
          const existingUserAccessData = existingUserAccess ? JSON.parse(existingUserAccess) : [{
            username1: 'admin', // Assuming admin is the username
            id: 0, // Assuming a unique identifier for the admin user
            userManagementView: true,
            userManagementControl: true,
            hierarchyManagementView: true,
            hierarchyManagementControl: true,
            reportManagementView: true,
            reportManagementControl: true,
            ftpManagementView: true,
            ftpManagementControl: true,
            externalActivityView: true,
            externalActivityEdit: true,
            smsConfigView: true,
            smsConfigEdit: true,
            SettingsView: true,
            SettingsControl: true
          }];
      
          // Merge existing user access data with new data, avoiding duplicates
          const mergedUserAccess = existingUserAccessData.slice(); // Create a shallow copy

      // Merge the data from usernames array to mergedUserAccess
      usernames.forEach(username => {
        // Find the index of the user with the same ID in mergedUserAccess
        const index = mergedUserAccess.findIndex((user: { id: any; }) => user.id === username.id);

        // If the user with the same ID is found in mergedUserAccess
        if (index !== -1) {
          // Replace the username of the existing user with the new one
          mergedUserAccess[index].username1 = username.username1;
        } else {
          // If the user with the same ID is not found, add it to mergedUserAccess
          mergedUserAccess.push(username);
        }
      });

      // Save merged user access data back to local storage
      localStorage.setItem('useraccess', JSON.stringify(mergedUserAccess));

      // Set the useraccess variable to the merged data
      this.useraccess = mergedUserAccess;

      console.log(mergedUserAccess, 'Merged useraccess data');

          //   usernames.forEach(username => {
          //   console.log(username,'sureshmutal')
          //   const exists = mergedUserAccess.some((user: any) => user.id === username.id);
          //   if (!exists) {
          //       mergedUserAccess.push({ username1: username.username1,id: username.id });
          //   }
          // });  


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
          let data = event.data;  
          data.id = event.data.__KEY__;
          console.log(data)
          this.updateGroupAccess(); 
          this.grouptablesave();
          this.isNewlyAddedRow = true;
          }

          onRowUpdatingForGroupTable(event:any){
            console.log(event,'groupupdate')
            // Update the corresponding row in your data source (grouptable)
            this.updateGroupAccess();    
            this.grouptablesave();  
            
          }

          onRowRemovingForGroupTable(event: any) {
            // Log the event object to the console for debugging
            console.log(event, this.grouptable);
            

            const sname = event.data.groupname;
            console.log(sname);
            

                  // Retrieve the dataSource from local storages
            const storedData = localStorage.getItem('dataSource');
            let dataSource: any[] = storedData ? JSON.parse(storedData) : [];
            console.log("Retrieved dataSource:", dataSource);

         const gopinayaki = dataSource.find(data => data.groupname === sname )

         console.log(gopinayaki)

         const filteredTags = dataSource
         .filter(item => item.groupname === sname)
         .map(item => item.Tags);
     
        console.log(filteredTags);

        // tags= groupname; username = username dataofgroupnmae( formate )
            const storedaataa = localStorage.getItem('dataofgroupnmae');
            let dataofgroupnmae: any[] = storedaataa ? JSON.parse(storedaataa) : [];

        // Iterate over each element in the dataSource array
        filteredTags.forEach((item, index) => {
          // Check if the item matches the structure { tags, username }
          if (item) {
           console.log(item)
        const userIndex = dataofgroupnmae.findIndex((baa: { Tags: any; username: any; }) => baa.Tags === sname && baa.username === item );
       console.log(userIndex)
;        if (userIndex !== -1) {
          dataofgroupnmae.splice(userIndex, 1);
          localStorage.setItem('dataofgroupnmae', JSON.stringify(dataofgroupnmae));
          console.log(userIndex,dataofgroupnmae);

        } else {
          console.log('Row not found in user data.');
        }


        console.log(item)
        const userIndex2 = dataSource.findIndex((baa: { Tags: any; groupname: any; }) => baa.Tags === item && baa.groupname === sname );
       console.log(userIndex2);
      if (userIndex2 !== -1) {
          dataSource.splice(userIndex2, 1);
          localStorage.setItem('dataSource', JSON.stringify(dataSource));
          console.log(userIndex,dataSource);

        } else {
          console.log('Row not found in user data.');
        }

          }
        });

        // Save the updated data back to local storage
        localStorage.setItem('dataSource', JSON.stringify(dataSource));


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
            width: '60%', // Set the width of the dialog
            height: '80%', // Set the height of the dialog
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
            width: '60%', // Set the width of the dialog
            height: '80%', // Set the height of the dialog
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
      
          //   updateGroupAccess() {
          //     console.log('15.3',this.grouptable)


          //     const groupNames = this.grouptable.map(group => ({groupname :group.groupname ,id:group.id}));
            

          //     console.log(groupNames)
          //     localStorage.setItem('groupNames', JSON.stringify(groupNames));
            
          //     const existingGroupAccess = localStorage.getItem('groupaccess');
          //     console.log(existingGroupAccess, 'existingGroupAccess');
          
          //     const existingGroupAccessData = existingGroupAccess ? JSON.parse(existingGroupAccess) : [];
          //     console.log(existingGroupAccessData, 'existingGroupAccessData');
            
          //     // Merge existing groupaccess data with new data, avoiding duplicates
          //     const mergedGroupAccess = existingGroupAccessData.slice(); // Create a shallow copy
          //     console.log(mergedGroupAccess, 'Merged groupaccess data');

          //     groupNames.forEach(groupname => {
          //       console.log(groupname);
          //         // Check if groupname already exists in mergedGroupAccess
          //         const exists = mergedGroupAccess.some((group: { id: any; }) => group.id === groupname.id);
          //         console.log(mergedGroupAccess, 'Merged groupaccess data');

          //         if (!exists) {
          //             mergedGroupAccess.push({ groupname1: groupname.groupname,id: groupname.id });
          //         }

          //       const index = mergedGroupAccess.findIndex((group: { id: any; }) => group.id === groupname.id);

          //       // If the user with the same ID is found in mergedUserAccess
          //       if (index !== -1) {
          //         // Replace the username of the existing user with the new one
          //         mergedGroupAccess[index].groupname1 = groupname.groupname;
          //       } else {
          //         // If the user with the same ID is not found, add it to mergedUserAccess
          //         mergedGroupAccess.push(groupname);
          //       }
          //     });              
          
          //     localStorage.setItem('groupaccess', JSON.stringify(mergedGroupAccess));
          
          //     this.groupaccess = mergedGroupAccess;
              
          // }
          

          updateGroupAccess() {
            console.log('grouptable', this.grouptable);
        
            // Extract group names and their corresponding IDs from the grouptable array
            const groupNames = this.grouptable.map(group => ({ groupname1: group.groupname, id: group.id }));
            console.log('groupNames', groupNames);
        
            // Save group names to local storage under the key 'groupNames'
            localStorage.setItem('groupNames', JSON.stringify(groupNames));
        
            // Retrieve existing group access data from local storage
            const existingGroupAccess = localStorage.getItem('groupaccess');
            console.log(existingGroupAccess, 'existingGroupAccess');
        
            // Parse existing group access data or initialize an empty array if no data exists
            const existingGroupAccessData = existingGroupAccess ? JSON.parse(existingGroupAccess) : [];
        
            // Merge existing group access data with new data, avoiding duplicates
            const mergedGroupAccess = existingGroupAccessData.slice(); // Create a shallow copy
        
            // Merge the data from groupNames array to mergedGroupAccess
            groupNames.forEach(groupname => {
                // Find the index of the group with the same ID in mergedGroupAccess
                const index = mergedGroupAccess.findIndex((group: { id: any; }) => group.id === groupname.id);
        
                // If the group with the same ID is found in mergedGroupAccess
                if (index !== -1) {
                    // Replace the group name of the existing group with the new one
                    mergedGroupAccess[index].groupname1 = groupname.groupname1;
                } else {
                    // If the group with the same ID is not found, add it to mergedGroupAccess
                    mergedGroupAccess.push(groupname);
                }
            });
         // Save merged group access data back to local storage
            localStorage.setItem('groupaccess', JSON.stringify(mergedGroupAccess));
        
            // Set the groupaccess variable to the merged data
            this.groupaccess = mergedGroupAccess;
        
            console.log(mergedGroupAccess, 'Merged groupaccess data');



      }


          handleRefresh() {
            window.location.reload();  
          }

  }           