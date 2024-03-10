import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {


  list = [
    { name: 'Home', url: '/home/usercomponmentcomp'},
    { name: 'Users', url: '/home/users'},
    { name: 'Tag Import', url: '/home/tag-hierarchy'},

  ];
  
  constructor() { }

  ngOnInit() {
  }



  drawerVisible = false;

  toggleDrawer(): void {
    this.drawerVisible = !this.drawerVisible;
  }
}
