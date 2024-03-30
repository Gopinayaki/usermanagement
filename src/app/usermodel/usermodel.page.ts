import { Component, Inject, Input, OnInit, input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define an interface for your option objects
interface Option {
  text: string;
}

@Component({
  selector: 'app-usermodel',
  templateUrl: './usermodel.page.html',
  styleUrls: ['./usermodel.page.scss'],
})
export class UsermodelPage implements OnInit {
  dataSource: any[] = [];
  usernames!: string[];
  tagname: Option[] = []; // Initialize as an empty array
  selectedRows: any[] = [];
  selectUser!: [];

  // @Input() data:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
 
  }

  ngOnInit() {
    console.log(this.data);
    const storedUsernames = localStorage.getItem('usernames');
    this.usernames = storedUsernames ? JSON.parse(storedUsernames) : [];
  
    // Convert the usernames array into Option objects and assign it to the tagname property
    this.tagname = this.usernames.map(username => ({ text: username }));
  
    // Retrieve existing data from local storage
    const storedData = localStorage.getItem('dataSource');
    console.log("storeddata",storedData);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Use a Set to keep track of unique groupname values
    const uniqueTags = new Set();


      const arrdata = parsedData.filter((item: { groupname: any; }) => item.groupname === this.data.groupname);
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


  onValueChanged(event: any) {
    this.selectUser = event.value;
    
    // Just an example, you can handle the selected options here
    const gname = this.data.groupname;
    const selectedOptions: Option[] = event.value;
    console.log(selectedOptions) // Explicitly specify the type of selectedOptions
    const mappedData = selectedOptions.map(option => ({ Tags: option, groupname: gname }));
  
    let storedData = localStorage.getItem('dataSource');
    let existingData: any[] = storedData ? JSON.parse(storedData) : [];
  
    // Use a Set to keep track of unique combinations of Tags and groupname
    const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));
  
    // Check for duplicates and only add unique items to the uniqueEntries Set
    mappedData.forEach(newItem => {
      const newItemString = JSON.stringify(newItem);
      uniqueEntries.add(newItemString);
    });
  
    // // Convert the uniqueEntries Set back to an array of objects
    // existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
  
    // // Save the updated dataSource array to local storage
    // localStorage.setItem('dataSource', JSON.stringify(existingData));
  
    // const filteredData = existingData.filter((item: { groupname: any; }) => item.groupname === this.data.groupname);
  
    // this.dataSource = filteredData;
    this.selectedRows=mappedData
    console.log(mappedData, this.dataSource);
  }
  

   onRowDeleted(event: any) {
      // Extract the deleted row data from the event object
      const deletedRowData = event.data;
    
      // Perform any necessary actions with the deleted row data
      console.log('Deleted row data:', deletedRowData);
    

  // Remove the deleted row data from the local storage
    let storedData = localStorage.getItem('dataSource');
    let existingData: any[] = storedData ? JSON.parse(storedData) : [];

    // Find the index of the deleted row in the existing data
    const index = existingData.findIndex(item => item.groupname === deletedRowData.groupname && item.Tags === deletedRowData.Tags);

    if (index !== -1) {
      // Remove the row from existingData
      existingData.splice(index, 1);
      localStorage.setItem('dataSource', JSON.stringify(existingData));

      const filteredData = existingData.filter((item: { groupname: any; }) => item.groupname === this.data.groupname);

      this.dataSource = filteredData;
      console.log(filteredData,this.dataSource);

    } else {
      console.log('Row not found in local storage.');
    }
  // Remove the deleted row data from the 'dataofgroupnmae' local storage
  let groupStoredData = localStorage.getItem('dataofgroupnmae');
  let groupData: any[] = groupStoredData ? JSON.parse(groupStoredData) : [];
    console.log("grpd",groupData);
  // Find the index of the deleted row in the group data
  const groupIndex = groupData.findIndex(item => item.Tags === deletedRowData.groupname && item.username === deletedRowData.Tags);

  if (groupIndex !== -1) {
    // Remove the row from groupData
    groupData.splice(groupIndex, 1);
    localStorage.setItem('dataofgroupnmae', JSON.stringify(groupData));
  } else {
    console.log('Row not found in dataofgroupnmae local storage.');
  }

  // Perform any other necessary actions with the deleted row data
  console.log('Deleted row data:', deletedRowData);

    }


  onRowInserting(event: any) {
    const gname = this.data.groupname;
    let storedData = localStorage.getItem('dataSource');
    let data: any[] = storedData ? JSON.parse(storedData) : [];
  
    // Use a Set to keep track of unique combinations of Tags and groupname
    // const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));
  
    console.log(data);

    // Concatenate existing dataSource with selectedRows
    let existingData = data.concat(this.selectedRows);

    // Convert the existingData array to a Set to remove duplicates
    const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

    // Convert the uniqueEntries Set back to an array of objects
    existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
    
    // Filter the data based on groupname
    const filteredData = existingData.filter((item: { groupname: any; }) => item.groupname === gname);
    localStorage.setItem('dataSource', JSON.stringify(existingData));

    // Update the dataSource and save it to local storage
    this.dataSource = filteredData;

    console.log(existingData, this.dataSource);
    const selectedOptions: Option[] = this.selectUser;
    console.log(selectedOptions)
    const mappedData = selectedOptions.map(option => ({ Tags: gname, username: option }));
    console.log("mappedData", mappedData);

    let groupstoredData = localStorage.getItem('dataofgroupnmae');
    let groupdata: any[] = groupstoredData ? JSON.parse(groupstoredData) : [];
  
    let groupexistingData = groupdata.concat(mappedData);
    console.log("groupdatam", groupexistingData);

    const groupuUniqueEntries = new Set(groupexistingData.map(item => JSON.stringify(item)));
    groupexistingData = Array.from(groupuUniqueEntries).map(item => JSON.parse(item));
    
    localStorage.setItem('dataofgroupnmae', JSON.stringify(groupexistingData));

}


}
