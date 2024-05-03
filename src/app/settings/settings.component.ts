import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  title: string = '';
  projectTitle: string = '';
  storedProjectTitle: string = '';

  constructor(private sharedService: SharedDataService) { }

  ngOnInit() {


    this.storedProjectTitle = localStorage.getItem('projectTitle') || '';

  }


  saveTitle(): void {
    localStorage.setItem('projectTitle', this.projectTitle); 
    this.sharedService.setPageName(this.projectTitle);

   // Clear the input field after saving
   this.projectTitle = '';
  }

  
}
