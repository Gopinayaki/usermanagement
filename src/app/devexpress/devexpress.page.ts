import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devexpress',
  templateUrl: './devexpress.page.html',
  styleUrls: ['./devexpress.page.scss'],
})
export class DevexpressPage implements OnInit {
  acesstable: any[] = [{
    userManagementView: true,
    userManagementControl: false,
    hierarchyManagementView: true,
    hierarchyManagementControl: true,
    reportManagementView: false,
    reportManagementControl: true,
    ftpManagementView: true,
    ftpManagementControl: false
  },
  // Add more data objects as needed
];

  constructor() { }

  ngOnInit() {

    // this.acesstable.forEach((row, index) => {
    //   localStorage.setItem(`acesstableRow${index}`, JSON.stringify(row));
    // });  
  
  }

}
