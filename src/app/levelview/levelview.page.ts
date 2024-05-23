import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define an interface to represent the structure of your data
interface MyData {
  Tags: string;
  levels: string;
  Access: string;
}

@Component({
  selector: 'app-levelview',
  templateUrl: './levelview.page.html',
  styleUrls: ['./levelview.page.scss'],
})
export class LevelviewPage implements OnInit {
  storedData: MyData[] = [];
  groupname: string;
  accessallonly = ['All', 'Only'];
  levelsss: any[] = []; 
  tasksData: any[] = [];



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dailogRef: MatDialogRef<LevelviewPage>,



) {
    this.groupname = data.groupname;
  }

  ngOnInit() {
    this.retrieveAndFilterData();

      // Retrieve data from local storage
      const tasksDataString = localStorage.getItem('tasksData');

      if (tasksDataString) {
        // Parse the JSON string back to an object
        this.tasksData = JSON.parse(tasksDataString);
        console.log(this.tasksData,'ggg')


        const levels = this.tasksData.map(task => task.levels);

        // Save the mapped levels to local storage
        localStorage.setItem('savedLevels', JSON.stringify(levels));
       
        const getstoredlevels = localStorage.getItem('savedLevels');
      if (getstoredlevels) {

        this.levelsss = JSON.parse(getstoredlevels)
      }
        console.log(this.levelsss,'gopi')

      } else {
        // Handle the case when the data doesn't exist in local storage
        console.log('No data found in local storage.');
      }

 
  }

  retrieveAndFilterData() {
    const storedDataString = localStorage.getItem('levelgroupaccess');

    if (storedDataString) {
      const allData: MyData[] = JSON.parse(storedDataString);
      // Filter data based on groupname
      this.storedData = allData.filter((item: MyData) => item.Tags === this.groupname);
    } else {
      console.log("No data found in local storage");
    }
  }

      onValueChanged(event:any){
   
      }


      onValChangedaccess(event:any){

      }

      onRowInserting(event:any){
        console.log(event)
        const gname = this.data.groupname;
        console.log(gname)
      }

    onRowDeleted(event:any){
    console.log(event)

    }

  dismiss() {
    this.dailogRef.close();
  }
  
}


