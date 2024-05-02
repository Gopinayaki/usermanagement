import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Define an interface to represent the structure of your data
interface MyData {
  Tags: string;
  levels: string;
  Access: string;
}

@Component({
  selector: 'app-levelview',
  templateUrl: './levelview.page.html',
  styleUrls: ['./levelview.page.scss'],
})
export class LevelviewPage implements OnInit {
  storedData: MyData[] = [];
  groupname: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dailogRef: MatDialogRef<LevelviewPage>,



) {
    this.groupname = data.groupname;
  }

  ngOnInit() {
    this.retrieveAndFilterData();
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


  dismiss() {
    this.dailogRef.close();
  }
  
}
