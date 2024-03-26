import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CellClickEvent, InitNewRowEvent, RowInsertedEvent, RowUpdatedEvent } from 'devextreme/ui/data_grid';
import { UsermodelPage } from '../usermodel/usermodel.page';

@Component({
  selector: 'app-heirarchymanagemnet',
  templateUrl: './heirarchymanagemnet.component.html',
  styleUrls: ['./heirarchymanagemnet.component.scss'],
})
export class HeirarchymanagemnetComponent  implements OnInit {


  grouptable: any[] = []; 

  
  customizeColumns(columns: any) {

    const customColumn = {
      caption: 'Edit', // Caption for the column header
      cellTemplate: 'customCellTemplate', // Specifies a custom cell template for the column
    };


    columns.unshift(customColumn);
  }

  constructor(private dialog: MatDialog) { }

  ngOnInit() {}






  openDialog(data:any) {


    console.log('Editing row:', data);
    // Open your dialog here
    this.dialog.open(UsermodelPage, {
        width: '60%', // Set the width of the dialog
        height: '80%', // Set the height of the dialog
        // You can add other options like data, panelClass, etc.
    });
  }
    onCellClick($event: any) {
      
    }
    onRowUpdatingForGroupTable($event: any) {
    throw new Error('Method not implemented.');
    }
    onRowInsertedForGroupTable($event: RowInsertedEvent) {
    throw new Error('Method not implemented.');
    }
    onInitNewRowForGroupTable($event: InitNewRowEvent) {
    throw new Error('Method not implemented.');
    }



}
