import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
interface Option {
  text: string;
}

@Component({
  selector: 'app-levelassignedgroups',
  templateUrl: './levelassignedgroups.page.html',
  styleUrls: ['./levelassignedgroups.page.scss'],
})
export class LevelassignedgroupsPage implements OnInit {
  groupNames!: string[];
  readonly allowedPageSizes = [5, 10, 'all'];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  groupdatasource: any [] =[];
  gp: Option[] = []; 
  selectedRows: any[] = [];
  selectGroup!: [];
 // accessallonly = ['All', 'Only', 'Exclude'];
  accessallonly = ['All', 'Only'];

  selAccLevelgrp: string | undefined;

  
  // Assuming group names are strings
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dailogRef: MatDialogRef<LevelassignedgroupsPage>,


            ) {

   }

      ngOnInit(): void {
        console.log(this.data);

        // Retrieve group names from local storage
        const storedGroupNames = localStorage.getItem('groupNames');
        this.groupNames =storedGroupNames ? JSON.parse(storedGroupNames) : [];

        this.gp = this.groupNames.map((groupNAME:any) => ({ text: groupNAME.groupname1 }));
          console.log(this.gp,'gp')
        const storedData = localStorage.getItem('levelgroupaccess');

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // Use a Set to keep track of unique groupname values
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
        this.groupdatasource = filteredData;
        console.log(filteredData);
    } else {
        console.log('No data found for the selected group.');
    }
    }
      }


      onValChanged(event: any) {
        const selectedValue = event.value;
        console.log(selectedValue)
        localStorage.setItem("selAccLevelgrp",selectedValue)
      }

      onValueChanged(event: any) {
        this.selectGroup = event.value;
        // Just an example, you can handle the selected options here
        const selAccLevelgrp = localStorage.getItem("selAccLevelgrp");

        const uname = this.data.levels;
        const selectedOptions: Option[] = event.value;
        console.log(selectedOptions) // Explicitly specify the type of selectedOptions
        const mappedData = selectedOptions.map(option => ({ Tags: option, levels: uname, Access: selAccLevelgrp }));
        let storedData = localStorage.getItem('levelgroupaccess'); 

        let existingData: any[] = storedData ? JSON.parse(storedData) : [];
      
        // Use a Set to keep track of unique combinations of Tags and groupname
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));
      
        // Check for duplicates and only add unique items to the uniqueEntries Set
        mappedData.forEach(newItem => {
          const newItemString = JSON.stringify(newItem);
          uniqueEntries.add(newItemString);
        });
      
        this.selectedRows=mappedData
        console.log(mappedData, this.groupdatasource);
      }

      onRowInserted(event:any){
        const uname = this.data.levels;
        let storedData = localStorage.getItem('levelgroupaccess');
        let data: any[] = storedData ? JSON.parse(storedData) : [];
      
        console.log(data);

        // Concatenate existing dataSource with selectedRows
        let existingData = data.concat(this.selectedRows);

        // Convert the existingData array to a Set to remove duplicates
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

        // Convert the uniqueEntries Set back to an array of objects
        existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
        
        // Filter the data based on uname
        const filteredData = existingData.filter((item: { levels: any; }) => item.levels === uname);
        localStorage.setItem('levelgroupaccess', JSON.stringify(existingData));
        let array2: any[] = []

        this.selectGroup.forEach(element => {
          if(existingData){            
            const name   = existingData.find((dada: { Tags: any; levels:any; Access:any; }) => {
            console.log("arrr",element,dada);     
                return dada.Tags === element;
            });
            array2.push(name)
            console.log("arrr",array2); 

             const groupnameee = array2[0].Tags
             console.log(groupnameee)

             const storedData23 = localStorage.getItem('dataSource');
             const selAccLevelgrp = localStorage.getItem("selAccLevelgrp");
             if (storedData23) {
              const parsedData = JSON.parse(storedData23);
             console.log(storedData23,'aaa',parsedData)
             const qwe = parsedData.filter((obj: { groupname: any; })=> obj.groupname === groupnameee);
              console.log(qwe,'qwe');
              const mappedData = qwe.map((option: { Tags: any; }) => ({ Tags: option.Tags, levels: uname, Access: selAccLevelgrp }));
              console.log(mappedData,'mappedDataaaa')
                    let storedData = localStorage.getItem('leveluser');
                    let existingData: any[] = storedData ? JSON.parse(storedData) : [];

                    // Use a Set to keep track of unique combinations of Tags and levels
                    const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

                    // Check for duplicates and only add unique items to the uniqueEntries Set
                    mappedData.forEach((newItem: any) => {
                      const newItemString = JSON.stringify(newItem);
                      console.log(newItemString)
                      uniqueEntries.add(newItemString);
                    });

                    this.selectedRows=mappedData
                    let data: any[] = storedData ? JSON.parse(storedData) : []; 
                    console.log(data);
                    // Concatenate existing dataSource with selectedRows
                    let existgData = data.concat(this.selectedRows);
                    console.log(this.selectedRows)
            
                    // Convert the existingData array ton a Set to remove duplicates
                    const uniqueEntries1 = new Set(existgData.map(item => JSON.stringify(item)));
            
                    // Convert the uniqueEntries Set back to an array of objects
                    existingData = Array.from(uniqueEntries1).map(item => JSON.parse(item));
                    console.log(existingData,"grrrrrr")
                    // Filter the data based on levels
                    // const filteredData = existingData.filter((item: { users: any; }) => item.users === gname );
                                                                                                                                                                             
                    localStorage.setItem('leveluser', JSON.stringify(existingData));
            
            }
        }
       });

        // Update the dataSource and save it to local storage
        this.groupdatasource = filteredData;

        console.log(existingData, this.groupdatasource);
      }

      onRowremove(event:any){

      // Extract the deleted row data from the event object
      const deletedRowData = event.data;
        
      // Perform any necessary actions with the deleted row data
      console.log('Deleted row data:', deletedRowData);


    // Remove the deleted row data from the local storage
    let storedData = localStorage.getItem('levelgroupaccess');
    let existingData: any[] = storedData ? JSON.parse(storedData) : [];

    // Find the index of the deleted row in the existing data
    const index = existingData.findIndex(item => item.levels === deletedRowData.levels && item.Tags === deletedRowData.Tags);

    if (index !== -1) {
      // Remove the row from existingData
      existingData.splice(index, 1);
      localStorage.setItem('levelgroupaccess', JSON.stringify(existingData));

      const filteredData = existingData.filter((item: { levels: any; }) => item.levels === this.data.levels);

      this.groupdatasource = filteredData;
      console.log(filteredData,this.groupdatasource);

    } else {
      console.log('Row not found in local storage.');
    }

      // Also, remove the row from the other dataSource if needed
      let userStoredData = localStorage.getItem('dataSource');
      let userExistingData: any[] = userStoredData ? JSON.parse(userStoredData) : [];

      console.log("uExistD",userExistingData);



      //tags:user, groupname: groupname. - array  
      let gdata = localStorage.getItem('dataofgroupnmae');
                
      if(gdata){
        let userleveldata =  JSON.parse(gdata);

      // level user output   Tags: "groupname", username:username}
      userExistingData.forEach(element => {
        const userIndex = userleveldata.findIndex((item: { Tags: any; username: any; }) => item.Tags === element.groupname && item.username === element.Tags );
          console.log(element.Tags,element.groupname)
        if (userIndex !== -1) {
          userleveldata.splice(userIndex, 1);
          localStorage.setItem('dataofgroupnmae', JSON.stringify(userleveldata));
          console.log(userIndex,userleveldata);

        } else {
          console.log('Row not found in user data.');
        }
      });

      }


        //tags:username, groupname: groupname. - array  
        let ldata = localStorage.getItem('leveluser');
          
        if(ldata){
          let userleveldata =  JSON.parse(ldata);

        // level user output   Tags: "username", levels: "levelname", Access: "All"}
        userExistingData.forEach(element => {
          const userIndex = userleveldata.findIndex((item: { Tags: any; levels: any; Access: any; }) => item.Tags === element.Tags && item.levels === deletedRowData.levels && item.Access === deletedRowData.Access);

          if (userIndex !== -1) {
            userleveldata.splice(userIndex, 1);
            localStorage.setItem('leveluser', JSON.stringify(userleveldata));
            console.log(userIndex,userleveldata);

          } else {
            console.log('Row not found in user data.');
          }
      });

    }
      }

      dismiss() {
        this.dailogRef.close();
      }

}