import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowInsertedEvent, RowUpdatedEvent } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-pagemanagement',
  templateUrl: './pagemanagement.component.html',
  styleUrls: ['./pagemanagement.component.scss'],
})
export class PagemanagementComponent  implements OnInit {
  selectedSegment: string = 'user';
  table1:   any[] =[];
  table2:   any[] =[];



 SelectSegment(e:any){ 

 }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {


    this.  saveDataToLocalStorage();

  }


  onRowInserted(event: any) {
  this.  saveDataToLocalStorage();
  }

  onRowUpdated(event: any) {
    // Find and update the existing row data
    const index = this.table1.findIndex(item => item.id === event.data.id);
    if (index !== -1) {
      this.table1[index] = event.data;
      // Save updated data to local storage
      localStorage.setItem('usertable2', JSON.stringify(this.table1));
    }
  }



  saveDataToLocalStorage() {
    const dataToSave = JSON.stringify(this.table1);
    localStorage.setItem('table1', dataToSave);


  }
}
