import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


interface Option {
  text: string;
}


@Component({
  selector: 'app-groupnameselect',
  templateUrl: './groupnameselect.page.html',
  styleUrls: ['./groupnameselect.page.scss'],
})
export class GroupnameselectPage implements OnInit {
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
  
  
  // Assuming group names are strings
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {


    
   }

   ngOnInit(): void {
    console.log(this.data);

    // Retrieve group names from local storage
    const storedGroupNames = localStorage.getItem('groupNames');
    this.groupNames =storedGroupNames ? JSON.parse(storedGroupNames) : [];

    this.gp = this.groupNames.map(groupNAME => ({ text: groupNAME }));

    const storedData = localStorage.getItem('dataofgroupnmae');

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Use a Set to keep track of unique groupname values
  const uniqueTags = new Set();


  const arrdata = parsedData.filter((item: { username: any; }) => item.username === this.data.username);
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
    const uname = this.data.username;
    const selectedOptions: Option[] = event.value;
    console.log(selectedOptions) // Explicitly specify the type of selectedOptions
    const mappedData = selectedOptions.map(option => ({ Tags: option, username: uname }));
  
    let storedData = localStorage.getItem('dataofgroupnmae');
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
    const uname = this.data.username;
    let storedData = localStorage.getItem('dataofgroupnmae');
    let data: any[] = storedData ? JSON.parse(storedData) : [];
  
    console.log(data);

    // Concatenate existing dataSource with selectedRows
    let existingData = data.concat(this.selectedRows);

    // Convert the existingData array to a Set to remove duplicates
    const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

    // Convert the uniqueEntries Set back to an array of objects
    existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
    
    // Filter the data based on uname
    const filteredData = existingData.filter((item: { username: any; }) => item.username === uname);
    localStorage.setItem('dataofgroupnmae', JSON.stringify(existingData));

    // Update the dataSource and save it to local storage
    this.groupdatasource = filteredData;

    console.log(existingData, this.groupdatasource);

    const selectedOptions: Option[] = this.selectGroup;
    console.log(selectedOptions)
    const mappedData = selectedOptions.map(option => ({ Tags: uname, groupname: option }));
    console.log("mappedData", mappedData);

    let userstoredData = localStorage.getItem('dataSource');
    let userdata: any[] = userstoredData ? JSON.parse(userstoredData) : [];
  
    let userexistingData = userdata.concat(mappedData);
    console.log("userdatam", userexistingData);

    const useruUniqueEntries = new Set(userexistingData.map(item => JSON.stringify(item)));
    userexistingData = Array.from(useruUniqueEntries).map(item => JSON.parse(item));
    
    localStorage.setItem('dataSource', JSON.stringify(userexistingData));
  
  }

  onRowremove(event: any): void {
    // Extract the deleted row data from the event object
    const deletedRowData = event.data;
    
    // Remove the deleted row data from the local storage
    let storedData = localStorage.getItem('dataofgroupnmae');
    let existingData: any[] = storedData ? JSON.parse(storedData) : [];
  
    // Find the index of the deleted row in the existing data
    const index = existingData.findIndex(item => item.username === deletedRowData.username && item.Tags === deletedRowData.Tags);
  
    if (index !== -1) {
      // Remove the row from existingData
      existingData.splice(index, 1);
      localStorage.setItem('dataofgroupnmae', JSON.stringify(existingData));
    } else {
      console.log('Row not found in local storage.');
    }
  
    // Update the dataSource
    this.groupdatasource = existingData.filter((item: { username: any; }) => item.username === this.data.username);
  
    // Also, remove the row from the other dataSource if needed
    let userStoredData = localStorage.getItem('dataSource');
    let userExistingData: any[] = userStoredData ? JSON.parse(userStoredData) : [];
  
    const userIndex = userExistingData.findIndex(item => item.Tags === deletedRowData.Tags && item.groupname === deletedRowData.groupname);
    
    if (userIndex !== -1) {
      userExistingData.splice(userIndex, 1);
      localStorage.setItem('dataSource', JSON.stringify(userExistingData));
    } else {
      console.log('Row not found in user data.');
    }
  }
  


}
