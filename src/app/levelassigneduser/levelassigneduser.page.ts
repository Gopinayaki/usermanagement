import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';

// Define an interface for your option objects
interface Option {
  text: string;
}

interface UserName {
  username1: string;
  id: string; // Assuming id is also a string based on your example
}

@Component({
  selector: 'app-levelassigneduser',
  templateUrl: './levelassigneduser.page.html',
  styleUrls: ['./levelassigneduser.page.scss'],
})
export class LevelassigneduserPage implements OnInit {
      dataSource: any[] = [];
      usernames!: string[];
      tagname: Option[] = []; // Initialize as an empty array
      selectedRows: any[] = [];
      selectUser!: [];
      selectedValue: Option[] = [];
      // accessallonly = ['All', 'Only', 'Exclude'];
      accessallonly = ['All', 'Only'];
      selAccLevel: string | undefined;

      // @Input() data:any
      constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public dailogRef: MatDialogRef<LevelassigneduserPage>,
      private modalCtrl: ModalController
    ) { 
    
      }

      closeModal() {
        this.modalCtrl.dismiss();
      }
      

      ngOnInit() {
        const storedUsernames = localStorage.getItem('usernames');
        this.usernames = storedUsernames ? JSON.parse(storedUsernames) : [];
        console.log(this.usernames,this.data);
      
        // Convert the usernames array into Option objects and assign it to the tagname property
        this.tagname = this.usernames.map((user:any)=> ({ text: user.username1 }));
        
       console.log(this.tagname)
        // Retrieve existing data from local storage
        const storedData = localStorage.getItem('leveluser');
        console.log("storeddata",storedData);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Use a Set to keep track of unique levels values1
        const uniqueTags = new Set();
        
          const arrdata = parsedData.filter((item: { levels: any; }) => item.levels === this.data.levels);
          const filteredData = arrdata.filter((item: { Tags: any; }) => {
            if (!uniqueTags.has(item.Tags)) {
              // If the Tags is not already in the set, add it and return true to keep the item
              uniqueTags.add(item.Tags);
              return true;
            }
            // If the Tags is already in the set, return false to filter it out
            return false;
          });
        
          if (filteredData.length > 0) {
              this.dataSource = filteredData;
              console.log(filteredData);
          } else {
              console.log('No data found for the selected group.');
          }
      }
      }

      onValChanged(event: any) {
        const selectedValue = event.value; 
          this.selAccLevel = selectedValue;

        console.log(selectedValue)
        localStorage.setItem("selAccLevel",selectedValue)
      }


      selLevel: any;
      onValueChanged(event: any) {
        this.selectUser = event.value;
        
        // Just an example, you can handle the selected options here
        const gname = this.data.levels;
        this.selLevel=gname;
        const selAccLevel = localStorage.getItem("selAccLevel");
        const selectedOptions: Option[] = event.value;
        console.log(event.value,'dummy')
        console.log(selectedOptions) // Explicitly specify the type of selectedOptions
        const mappedData = selectedOptions.map(option => ({ Tags: option, levels: gname, Access: selAccLevel }));
      
        let storedData = localStorage.getItem('leveluser');
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
        console.log(mappedData, this.dataSource);
      }

   
      onRowDeleted(event: any) {
        // Extract the deleted row data from the event object
        const deletedRowData = event.data;
                                                                                
        // Perform any necessary actions with the deleted row data
        console.log('Deleted row data:', deletedRowData);
        
      // Remove the deleted row data from the local storage
        let storedData = localStorage.getItem('leveluser');
        let existingData: any[] = storedData ? JSON.parse(storedData) : [];

      // Find the index of the deleted row in the existing data
      const index = existingData.findIndex(item => item.levels === deletedRowData.levels && item.Tags === deletedRowData.Tags);

      if (index !== -1) {
        // Remove the row from existingData
        existingData.splice(index, 1);
        localStorage.setItem('leveluser', JSON.stringify(existingData));

        const filteredData = existingData.filter((item: { levels: any; }) => item.levels === this.data.levels);

        this.dataSource = filteredData;
        console.log(filteredData,this.dataSource);

      } else {
        console.log('Row not found in local storage.');
      }
      } 
      
     
      
      onRowInserting(event: any) {
        console.log("n",event);
        const gname = this.data.levels;
        let storedData = localStorage.getItem('leveluser');
        let data: any[] = storedData ? JSON.parse(storedData) : []; 
        console.log(data);
        // Concatenate existing dataSource with selectedRows
        let existingData = data.concat(this.selectedRows);
        console.log(this.selectedRows)

        // Convert the existingData array ton a Set to remove duplicates
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

        // Convert the uniqueEntries Set back to an array of objects
        existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
        
        // Filter the data based on levels
        const filteredData = existingData.filter((item: { levels: any; }) => item.levels === gname );
                                                                                                                                               
        localStorage.setItem('leveluser', JSON.stringify(existingData));

        // Update the dataSource and save it to local storage
        this.dataSource = filteredData;
     
        console.log(existingData, this.dataSource);
      
        const taskd = localStorage.getItem('tasksData');
        if (taskd !== null) {
          let tasksData = JSON.parse(taskd);

          // const filteredTasks = tasksData.filter((task: { Task_Parent_ID: number; levels: string; }) => task.Task_Parent_ID === 0);
          if(this.selAccLevel ===  "All"){
            const filteredLevels = tasksData.filter((task: { Task_Parent_ID: number; }) => task.Task_Parent_ID === 0);
            const filteredUserData = existingData.filter((user: { levels: any }) =>
              filteredLevels.some((filteredLevel: { levels: any; }) => filteredLevel.levels === user.levels)
            );
            console.log(filteredLevels,filteredUserData);

            const finalFilteredTasks = filteredUserData.filter(task => task.Access === "All" && task.levels === this.selLevel);
            // const filTasks= finalFilteredTasks.map(user => user.Tags);
            console.log("finalFilteredTasks",finalFilteredTasks);
            const taskIDs = filteredLevels.filter((task: { Task_ID: any; levels: any}) => task.Task_ID && ( task.levels=== this.selLevel));
            let arr = [];
            let arr2 = [];

            let selectedOpts: any[] = [];
            const filTasks= taskIDs.map((task: { Task_ID: any; }) => task.Task_ID);
            console.log("id",taskIDs,filTasks);

            filTasks.forEach((element: any) => {  
              // for (let index = 0; index < taskIDs.length; index++) {
              // const element = taskIDs[index];
                arr = tasksData.filter((task: { Task_Parent_ID: any; })=> task.Task_Parent_ID === element);
                const levls = arr.map((tk: { levels: any; })=>tk.levels);
                arr2 = tasksData.filter((task: { Task_ID: any; })=> task.Task_ID === element);
                console.log("arr",arr,arr2,levls);
              // const taskID = this.getTaskIDByLevels(this.selLevel);
              //  if(this.selLevel === "" )
                levls.forEach((level: any) => {
                  finalFilteredTasks.forEach((element: any) => {
                    selectedOpts.push({ Tags: element.Tags, levels: level, Access: "All" });
                  });
                });
            });



        // Concatenate existingData array with uniqueSelectedOptsArray
        let existData = existingData.concat(selectedOpts);
        // Convert selectedOpts array to a Set to remove duplicates
        const uniqueSelectedOpts = new Set(existData.map(item => JSON.stringify(item)));
        console.log(uniqueSelectedOpts,'unique')
        // Convert the uniqueSelectedOpts Set back to an array of objects
        const uniqueSelectedOptsArray = Array.from(uniqueSelectedOpts).map(item => JSON.parse(item));
        console.log(uniqueSelectedOptsArray,'unique2')

        // console.log("opt", uniqueSelectedOptsArray, existData);

        localStorage.setItem('leveluser', JSON.stringify(uniqueSelectedOptsArray));


            // let existData = existingData.concat(selectedOpts);
            // console.log("opt",selectedOpts,existData)

            // localStorage.setItem('leveluser', JSON.stringify(existData));

          }
        } 
      }

      dismiss() {
        this.dailogRef.close();
      }
      
 
} 