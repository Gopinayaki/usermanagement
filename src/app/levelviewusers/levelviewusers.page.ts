      import { Component, Inject, OnInit } from '@angular/core';
      import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

      // Define an interface to represent the structure of your data
      interface MyData {
        Tags: string;
        users: string;
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
        selAccLevel2: string | undefined;
        selectlevels!: [];
        selectedRows: any[] = [];


        constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        public dailogRef: MatDialogRef<LevelviewusersPage>,

      ) {
          this.username = data.username;
        }

        ngOnInit() {
          console.log(this.data);

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
        selLevel: any;
              onValueChanged(event:any){
                this.selectlevels = event.value;
                console.log(event,'kkk')

                // Just an example, you can handle the selected options here
                    const gname = this.data.username;
                    this.selLevel=gname;

                    const selAccLevel = localStorage.getItem("selAccLevel2");
                    const selectedOptions: Option[] = event.value;
                    console.log(selectedOptions) // Explicitly specify the type of selectedOptions
                    const mappedData = selectedOptions.map(option => ({ Tags: gname, levels: option, Access: selAccLevel }));

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
                    console.log(mappedData);

              }

              onValChangedaccess(event:any){
                const selectedValue = event.value; 
                this.selAccLevel2 = selectedValue;
              console.log(selectedValue)
              localStorage.setItem("selAccLevel2",selectedValue)
              }

        retrieveAndFilterData() {
          const storedData = localStorage.getItem('leveluser');
          console.log(storedData,'jjj',this.username)

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
        console.log("n",event);
        const gname = this.data.username;
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
        console.log(gname,"grhfh")
        // Filter the data based on levels
        const filteredData = existingData.filter((item: { users: any; }) => item.users === gname );
                                                                                                                                              
        localStorage.setItem('leveluser', JSON.stringify(existingData));

        // Update the dataSource and save it to local storage
        this.storedData1 = filteredData;

        console.log(existingData, this.storedData1);

        const taskd = localStorage.getItem('tasksData');
        if (taskd !== null) {
          let tasksData = JSON.parse(taskd);
          console.log(tasksData,this.selAccLevel2);

          // const filteredTasks = tasksData.filter((task: { Task_Parent_ID: number; levels: string; }) => task.Task_Parent_ID === 0);
          if(this.selAccLevel2 ===  "All"){

            const filteredLevels = tasksData.filter((task: { Task_Parent_ID: number; }) => task.Task_Parent_ID === 0);
            const filteredUserData = existingData.filter((user: { levels: any }) =>
              filteredLevels.some((filteredLevel: { levels: any; }) => filteredLevel.levels === user.levels)
            );
            console.log(filteredLevels,filteredUserData);

// Filter the objects based on the selLevel value
const filterLevelUser = existingData.filter(item => item.Tags === this.selLevel);

// Map the filtered data to get only the levels property
let levelname = filterLevelUser.map(item => item.levels);
console.log(filterLevelUser,levelname);

            const finalFilteredTasks = filteredUserData.filter(task => task.Access === "All");
            const taskIDs = filteredLevels.filter((task: { Task_ID: any; levels: any}) =>  task.levels === levelname[0]);
            let arr = [];
            let arr2 = [];

            let selectedOpts: any[] = [];
            const filTasks= taskIDs.map((task: { Task_ID: any; }) => task.Task_ID);
            console.log("id",taskIDs,filTasks);

            filTasks.forEach((element: any) => {  
                arr = tasksData.filter((task: { Task_Parent_ID: any; })=> task.Task_Parent_ID === element);
                const levls = arr.map((tk: { levels: any; })=>tk.levels);
                arr2 = tasksData.filter((task: { Task_ID: any; })=> task.Task_ID === element);
                console.log("arr",arr,arr2,levls);
                levls.forEach((level: any) => {
                  finalFilteredTasks.forEach((element: any) => {
                    selectedOpts.push({ Tags: element.Tags, levels: level, Access: "All" });
                  });
                });
            });

            let existData = existingData.concat(selectedOpts);
            console.log("opt",selectedOpts,existData)

            localStorage.setItem('leveluser', JSON.stringify(existData));

          }
        } 
      }


      onRowDeleted(event:any){
      console.log(event)

      }


      }
