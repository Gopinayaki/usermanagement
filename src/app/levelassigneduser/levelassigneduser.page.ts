import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define an interface for your option objects
interface Option {
  text: string;
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
      accessallonly: string[] = ["All", "Only", "Exclude"];
      selAccLevel: string | undefined;

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
        const storedData = localStorage.getItem('leveluser');
        console.log("storeddata",storedData);
          if (storedData) {
            const parsedData = JSON.parse(storedData);
            // Use a Set to keep track of unique levels values
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
        console.log(selectedValue)
        localStorage.setItem("selAccLevel",selectedValue)
      }
      
      onValueChanged(event: any) {
        this.selectUser = event.value;
        
        // Just an example, you can handle the selected options here
        const gname = this.data.levels;
        const selAccLevel = localStorage.getItem("selAccLevel");
        const selectedOptions: Option[] = event.value;
        console.log(selectedOptions) // Explicitly specify the type of selectedOptions
        const mappedData = selectedOptions.map(option => ({ Tags: option, levels: gname, accesslevel: selAccLevel }));
      
        let storedData = localStorage.getItem('leveluser');
        let existingData: any[] = storedData ? JSON.parse(storedData) : [];
      
        // Use a Set to keep track of unique combinations of Tags and levels
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));
      
        // Check for duplicates and only add unique items to the uniqueEntries Set
        mappedData.forEach(newItem => {
          const newItemString = JSON.stringify(newItem);
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

        // Convert the existingData array to a Set to remove duplicates
        const uniqueEntries = new Set(existingData.map(item => JSON.stringify(item)));

        // Convert the uniqueEntries Set back to an array of objects
        existingData = Array.from(uniqueEntries).map(item => JSON.parse(item));
        
        // Filter the data based on levels
        const filteredData = existingData.filter((item: { levels: any; }) => item.levels === gname );
    ;
        localStorage.setItem('leveluser', JSON.stringify(existingData));

        // Update the dataSource and save it to local storage
        this.dataSource = filteredData;
     
        console.log(existingData, this.dataSource);
      
        }
}
 