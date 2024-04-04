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

  tasksData = []
  isLevelsEmpty: boolean = true;
  
  
  constructor(  private dialog: MatDialog) { }

  ngOnInit() {


        // Retrieve data from local storage when the component initializes
    const savedTasksData = localStorage.getItem('tasksData');
    if (savedTasksData) {
      this.tasksData = JSON.parse(savedTasksData);
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
          console.log(event);
          
          // Assuming event contains the row data you want to delete
          const index = this.tasksData.findIndex((task: any) => task.id === event.id); // Modify this condition based on your data structure
          if (index !== -1) {
            this.tasksData.splice(index, 1); // Remove the item from the array
            this.saveToLocalStorage(); // Save the updated data to local storage
          }
        }
        

}
