import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define an interface to represent the structure of your data
interface MyData {
  Tags: string;
  levels: string;
  Access: string;
}


interface Option {
  text: string;
}

@Component({
  selector: 'app-levelviewusers',
  templateUrl: './levelviewusers.page.html',
  styleUrls: ['./levelviewusers.page.scss'],
})
export class LevelviewusersPage implements OnInit {
  storedData1: MyData[] = [];
  username: string;
  tasksData: any[] = [];
  levels!: string[];
  levelsss: any[] = []; 
  accessallonly = ['All', 'Only'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dailogRef: MatDialogRef<LevelviewusersPage>,

) {
    this.username = data.username;
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

  onValueChanged(event:any){

  }
  onValChangedaccess(event:any){
  
  }

  retrieveAndFilterData() {
    const storedData = localStorage.getItem('leveluser');
    console.log(storedData,'jjj')

    if (storedData) {
      const allData: MyData[] = JSON.parse(storedData);
      // Filter data based on username
      this.storedData1 = allData.filter((item: MyData) => item.Tags === this.username);
      
    } else {
      console.log("No data found in local storage");
    }
  }


  
dismiss() {
  this.dailogRef.close();
}







onRowInserting(event: any) {
  console.log(event)

}


onRowDeleted(event:any){
console.log(event)

}








}
