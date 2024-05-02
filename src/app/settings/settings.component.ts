import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  title: string = '';

  
  constructor() { }

  ngOnInit() {}




  saveTitle(): void {
    if (this.title.trim() !== '') {
      localStorage.setItem('savedTitle', this.title);
      // Optionally, you can provide a success message or perform any other action
      console.log('Title saved successfully!');
    } else {
      // If no title is entered, you can provide an error message or handle it as per your requirement
      console.error('Please enter a title!');
    }
  }

}
