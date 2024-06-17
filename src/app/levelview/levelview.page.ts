import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define an interface to represent the structure of your data
interface MyData {
  Tags: string;
  levels: string;
  Access: string;
  groups: string;

}

interface Option {
  text: string;
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
  selAccLevelforgrp: string | undefined;
  selectlevels!: [];
  selLevel: any;
  selectedRows: any[] = [];



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dailogRef: MatDialogRef<LevelviewPage>,) 
  {
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
        this.selectlevels = event.value;
        console.log(event,'krrr')

        // Just an example, you can handle the selected options here
        const gname = this.data.groupname;
        this.selLevel=gname;
        console.log(gname)
       
        const selAccLevel = localStorage.getItem("selAccLevelforgrp");
        const selectedOptions: Option[] = event.value;
        console.log(selectedOptions) // Explicitly specify the type of selectedOptions
        const mappedData = selectedOptions.map(option => ({ Tags: gname, levels: option, Access: selAccLevel }));
        console.log(mappedData)

        let storedData = localStorage.getItem('levelgroup');
                    let existingData: any[] = storedData ? JSON.parse(storedData) : [];

                    // Use a Set to keep track of unique combinations of Tags and levels
                    const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

                    // Check for duplicates and only add unique items to the uniqueEntries Set
                    mappedData.forEach(newItem => {
                      const newItemString = JSON.stringify(newItem);
                      console.log(newItemString)
                      uniqueEntries.add(newItemString);
                    });

                    this.selectedRows=mappedData
                    console.log(mappedData);



      }

      onValChangedaccess(event:any){
        const selectedValue = event.value; 
        this.selAccLevelforgrp = selectedValue;
      console.log(selectedValue)
      localStorage.setItem("selAccLevelforgrp",selectedValue)
      }

      onRowInserting(event:any){
        console.log(event)
        const gname = this.data.groupname;
        console.log(gname)

        let storedData = localStorage.getItem('levelgroup');
        let data: any[] = storedData ? JSON.parse(storedData) : []; 
        console.log(data);

          // Concatenate existing dataSource with selectedRows
          let existingData = data.concat(this.selectedRows);
          console.log(this.selectedRows)

        // Convert the existingData array ton a Set to remove duplicates
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

        // Convert the uniqueEntries Set back to an array of objects
        existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
        console.log(gname,"grhfh")
        // Filter the data based on levels
        const filteredData = existingData.filter((item: { Tags: any; }) => item.Tags === gname );
                                                                                                                                              
        localStorage.setItem('levelgroup', JSON.stringify(existingData));


          // Update the dataSource and save it to local storage
          this.storedData = filteredData;

          console.log(existingData, this.storedData);

      }

      onRowDeleted(event:any){
      console.log(event)

      }

    dismiss() {
      this.dailogRef.close();
    }
  
}