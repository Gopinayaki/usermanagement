import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

// Define an interface to represent the structure of your data
interface MyData {
  Tags: string;
  levels: string;
  Access: string;
}
@Component({
  selector: 'app-levelviewusers',
  templateUrl: './levelviewusers.page.html',
  styleUrls: ['./levelviewusers.page.scss'],
})
export class LevelviewusersPage implements OnInit {
  storedData1: MyData[] = [];
  username: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.username = data.username;
  }

  ngOnInit() {
    this.retrieveAndFilterData();
  }

  retrieveAndFilterData() {
    const storedData = localStorage.getItem('leveluser');
    console.log(storedData,'jjj')

    if (storedData) {
      const allData: MyData[] = JSON.parse(storedData);
      // Filter data based on username
      this.storedData1 = allData.filter((item: MyData) => item.Tags === this.username);
      
    } else {
      console.log("No data found in local storage");
    }
  }
}
