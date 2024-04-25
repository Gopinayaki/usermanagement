import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LevelassigneduserPage } from '../levelassigneduser/levelassigneduser.page';
import { LevelassignedgroupsPage } from '../levelassignedgroups/levelassignedgroups.page';

@Component({
  selector: 'app-heirarchymanagemnet',
  templateUrl: './heirarchymanagemnet.component.html',
  styleUrls: ['./heirarchymanagemnet.component.scss'],
})

export class HeirarchymanagemnetComponent  implements OnInit {

  tasksData = [];
  tasks = [];
  isLevelsEmpty: boolean = true;
  ShowHierarchyAccess: boolean = false;
  
  constructor(  private dialog: MatDialog) { }

  ngOnInit() {
    // Retrieve data from local storage when the component initializes
    const savedTasksData = localStorage.getItem('tasksData');
    if (savedTasksData) {
      this.tasks = JSON.parse(savedTasksData);
      console.log("tdt",this.tasks);
    }

    let storedData = localStorage.getItem('leveluser');
    console.log("dtd",storedData);
    let array : any[]=[];
    let arrayTasks : any[]=[];

    if (storedData !== null) {
      array =  JSON.parse(storedData);
  }
  
  // Get the hierarchy users array from localStorage
  const users = localStorage.getItem('hierarchyUsersControl');
  console.log(users)
  
  let user = localStorage.getItem("userName");
  console.log(user)
  
  const yg = array.filter(task => task.Tags === user);
  const lev = yg.map(lev => lev.levels);
  
  console.log("Filtered Objects:", yg);
  console.log("Extracted Levels:", lev);
  
  for (let index = 0; index < lev.length; index++) {
      const element = lev[index];
      const result = this.tasks.filter((task: { levels: any; })=> task.levels === element);
  
      // Push each element of the result array into the tasksData array
      for (let i = 0; i < result.length; i++) {
          this.tasksData.push(result[i]);
      }
  }
    
      
    
    // lev.forEach(element => {
    //   // this.tasksData.filter(qw=> qw === element);
    //   const result = this.tasks.filter((task: { levels: any; })=> task.levels === element);
    //   this.tasksData =result;
    // });
    
    console.log(this.tasksData,"usrs",user,users);
    if (users && user) {
        // Parse the hierarchy users array
        const parsedUsers = JSON.parse(users);
        console.log(parsedUsers)
        // Check if the user exists in the parsed users array
        const userExists = parsedUsers.some((u: any) => u === user);
        
        if (userExists) {
          this.ShowHierarchyAccess = true;
          console.log("User exists in hierarchy users array.");

        } else {
          this.ShowHierarchyAccess = false;
          console.log("User does not exist in hierarchy users array.");
        }
    } else {
        console.log("Hierarchy users data or user data is missing in localStorage.");
    }

    }

      onRowInserted(event:any){
        console.log(event)

        this.saveToLocalStorage();


      }
      

      saveToLocalStorage(): void {
        // Convert data to JSON string and save it to local storage


        localStorage.setItem('tasksData', JSON.stringify(this.tasksData));
      }

      customizeColumns(columns: any) {

        const customColumngroup = {
          caption: 'Assigned Groups', // Caption for the column header
          cellTemplate: 'customCellTemplategroups',
          cssClass: 'custom-column-header' // Specifies a custom cell template for the column
        };

        const customColumnuser = {
          caption: 'Assigned Users', // Caption for the column header
          cellTemplate: 'customCellTemplateusers',
          cssClass: 'custom-column-header' // Specifies a custom cell template for the column
        };


        columns.unshift(customColumnuser);
        columns.unshift(customColumngroup);

      }


      openDialousers(data:any) {
        const name=data.row.data.levels;
        console.log('Editing row:', data, name);
          // Open your dialog here
          this.dialog.open(LevelassigneduserPage, {
              width: '40%', // Set the width of the dialog
              height: '60%', // Set the height of the dialog
              // You can add other options like data, panelClass, etc.
              data: {
                levels: name,
              },
          });
          }


      openDialogroup(data:any) {
     
        const name=data.row.data.levels;
        console.log('Editing row:', data, name);
           // Open your dialog here
           this.dialog.open(LevelassignedgroupsPage, {
               width: '40%', // Set the width of the dialog
               height: '60%', // Set the height of the dialog
               // You can add other options like data, panelClass, etc.
               data: {
                levels: name,
              },
           });
    
          
    
         }


         onrowdeleted(event: any) {
          // Get the index of the deleted row in tasksData
          const index = this.tasksData.findIndex((item: any) => item.Task_ID === event.data.Task_ID);
          console.log("After deletion:", this.tasksData);
          console.log("Before deletion:", this.tasksData);

      
          // If the index is found, remove the row from tasksData
          if (index !== -1) {
              this.tasksData.splice(index, 1); // Remove the row at the found index
              console.log("Row deleted:", event.data);
          }
      
          // Save the updated tasksData to local storage
          this.saveToLocalStorage();
      }
      

}