import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  accessallonly = [
    { accessID: 1, plates: "All" },
    { accessID: 2, plates: "Only" },
    { accessID: 3, plates: "Exclude" }

  ];
  // Assuming group names are strings
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {


    
  }

     ngOnInit(): void {
       console.log(this.data);

       // Retrieve group names from local storage
       const storedGroupNames = localStorage.getItem('groupNames');
       this.groupNames =storedGroupNames ? JSON.parse(storedGroupNames) : [];

       this.gp = this.groupNames.map(groupNAME => ({ text: groupNAME }));

       const storedData = localStorage.getItem('levelgroupname');

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
     onValueChanged(event: any) {
      this.selectGroup = event.value;
      // Just an example, you can handle the selected options here
      const uname = this.data.levels;
      
      const selectedOptions: Option[] = event.value;


      console.log(selectedOptions) // Explicitly specify the type of selectedOptions
      const mappedData = selectedOptions.map(option => ({ Tags: option, levels: uname }));
    
      let storedData = localStorage.getItem('levelgroupname');
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
      let storedData = localStorage.getItem('levelgroupname');
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
      localStorage.setItem('levelgroupname', JSON.stringify(existingData));

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
  let storedData = localStorage.getItem('levelgroupname');
  let existingData: any[] = storedData ? JSON.parse(storedData) : [];

  // Find the index of the deleted row in the existing data
  const index = existingData.findIndex(item => item.levels === deletedRowData.levels && item.Tags === deletedRowData.Tags);

  if (index !== -1) {
    // Remove the row from existingData
    existingData.splice(index, 1);
    localStorage.setItem('levelgroupname', JSON.stringify(existingData));

    const filteredData = existingData.filter((item: { levels: any; }) => item.levels === this.data.levels);

    this.groupdatasource = filteredData;
    console.log(filteredData,this.groupdatasource);

  } else {
    console.log('Row not found in local storage.');
  }

}}
