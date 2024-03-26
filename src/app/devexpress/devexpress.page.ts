import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devexpress',
  templateUrl: './devexpress.page.html',
  styleUrls: ['./devexpress.page.scss'],
})
export class DevexpressPage implements OnInit {
  users: any[] = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', age: 35, email: 'alice@example.com' }
  ];

  columns: any[] = [
    { dataField: 'id', caption: 'ID' },
    { dataField: 'name', caption: 'Name' },
    { dataField: 'age', caption: 'Age' }
  ];

  constructor() { }

  ngOnInit() { }

}
