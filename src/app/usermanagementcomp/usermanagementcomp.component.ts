import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { UsermodelPage } from '../usermodel/usermodel.page';
import { GroupnameselectPage } from '../groupnameselect/groupnameselect.page';
import { LevelviewPage } from '../levelview/levelview.page';
import { LevelviewusersPage } from '../levelviewusers/levelviewusers.page';

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
  usertable2: any[] = [];
  useraccess: any[] = []; 
  grouptable: any[] = []; 
  groupaccess: any[] = [];
  users: any[] = [];
  isNewlyAddedRow: boolean = false;


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

    constructor(
      private dialog: MatDialog,
      private router: Router,
      private modalController: ModalController
      ) { }



    ngOnInit(): void {
    
    // Retrieve data from local storage on component initialization
    const storedData = localStorage.getItem('usertable2');
    if (storedData) {
      this.usertable2 = JSON.parse(storedData);
    } else {
      this.usertable2 = []; // Initialize to an empty array if no data exists in local storage
    }



    const storedGrouptable1 = localStorage.getItem('grouptable1');
    this.grouptable = storedGrouptable1 ? JSON.parse(storedGrouptable1) : [];
   

    // this.useraccess = this.userAccessService.getUserAccess();
    console.log(this.useraccess);
    this.updateUserAccess();
    this.retrieveUsernamesFromUserAccess();
    // this.saveGroupNameToLocalStorage();


    // const astoredData = localStorage.getItem('groupaccess');
    // if (astoredData) {
    //   const parsedData = JSON.parse(astoredData);
    //   console.log("storeddata",astoredData,parsedData);
    //   }
    //   this.groupaccess = astoredData ? JSON.parse(astoredData)
    
    // }
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
      }

      SelectSegment(e:any){ 

      }

        onrowupdateuseraccesstable(event: any) {
          console.log(event)
          // const updatedUserAccess = event.data;
          // Update this.useraccess array
          // this.useraccess.push(updatedUserAccess);
          const name = event.key['username1'];
          const updatedData = event.data;
          updatedData['username1'] = name;    // localStorage.setItem('userAccessData', JSON.stringify(updatedUserAccess));
          const dataToSave = JSON.stringify(updatedData);
          localStorage.setItem('useraccess', dataToSave);

          console.log(this.useraccess);
        }
        

          updateUserAccess() {
          // Extract usernames and store them separately
          const usernames = this.usertable2.map(user => user.username);
          localStorage.setItem('usernames', JSON.stringify(usernames));

          // Optionally, you can also update this.useraccess if needed
          const userAccessData = usernames.map(username => (
            { 
              username1: username ,
              emailConfigEdit: false,
              emailConfigView: false,
              externalActivityEdit: false,
              externalActivityView:false,
              ftpManagementControl: false,
              ftpManagementView: false,
              hierarchyManagementControl: false,
              hierarchyManagementView: false,
              reportManagementControl: false,
              reportManagementView: false,
              smsConfigEdit: false,
              smsConfigView: false,
              supportControl: false,
              supportView: false,
              userManagementControl: false,
              userManagementView: false,
          }
            ));

            this.useraccess= userAccessData;

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
              console.log(event);
              
              // Remove the row from the data source (assuming grouptable is an array)
              const rowIndex = this.grouptable.findIndex((item: any) => item === event.data);
              if (rowIndex !== -1) {
                  this.grouptable.splice(rowIndex, 1);
                  
                  // Save the updated data to local storage
                  this.grouptablesave();
                  
                  // Save any other changes you need to make to local storage
                  this.saveGroupNameToLocalStorage();
                  
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
      // Save the clicked cell's data to local storage

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

          // saveGroupNameToLocalStorage() {
          //   // Extract group names from grouptable array
          //   const groupNames = this.grouptable.map(group => group.groupname);
          
          //   // Save group names to local storage
          //   localStorage.setItem('groupNames', JSON.stringify(groupNames));
          
          //   // Optionally, you can also update this.useraccess if needed
          //       const groupaccessdta = groupNames.map(groupname => (
          //   { 
          //     groupname1: groupname ,
          //     emailConfigEdit: false,
          //     emailConfigView: false,
          //     externalActivityEdit: false,
          //     externalActivityView:false,
          //     ftpManagementControl: false,
          //     ftpManagementView: false,
          //     hierarchyManagementControl: false,
          //     hierarchyManagementView: false,
          //     reportManagementControl: false,
          //     reportManagementView: false,
          //     smsConfigEdit: false,
          //     smsConfigView: false,
          //     supportControl: false,
          //     supportView: false,
          //     userManagementControl: false,
          //     userManagementView: false,
          //   }
          //   ));

          //     this.groupaccess= groupaccessdta;
          //   localStorage.setItem('grpacc', JSON.stringify(groupaccessdta));

          //     }

            // onRowInsertedgrpaccess(event:any){

            //   const acc = localStorage.getItem('grpacc');
            //   if (acc !== null) {
            //       const parsedAcc = JSON.parse(acc); // Parse the string to convert it into an array of objects
            //       const arrayOfValues = parsedAcc.map((obj: any) => Object.values(obj));
            //       console.log(arrayOfValues);
            //   } else {
            //       console.log('No data found for the key "grpacc" in localStorage.');
            //   }

            // }


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
              } else {
                console.log(`Group with groupname '${groupname}' not found in groupaccess array.`);
              }
            }
      
            saveGroupNameToLocalStorage() {
              // Extract group names from grouptable array
              const groupNames = this.grouptable.map(group => group.groupname);
            
              // Save group names to local storage
              localStorage.setItem('groupNames', JSON.stringify(groupNames));
          
          
              const groupaccessdta = groupNames.map(groupname => (
              { 
                groupname1: groupname 
              }
              ));
               console.log(groupaccessdta,'kopi')
                    //  this.groupaccess= groupaccessdta;
            localStorage.setItem('groupaccess', JSON.stringify(groupaccessdta));

              const storedData = localStorage.getItem('groupaccess');
              if (storedData) {
                const parsedData = JSON.parse(storedData);
                console.log("storeddata",storedData,parsedData);
                }
                this.groupaccess = storedData ? JSON.parse(storedData) : groupaccessdta;
                console.log("groupaccess",this.groupaccess);
                }
  }