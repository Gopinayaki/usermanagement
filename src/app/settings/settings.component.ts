import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../shared-data.service';
import { AlertController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  title: string = '';
  projectTitle: string = '';
  storedProjectTitle: string = '';

  constructor(private sharedService: SharedDataService,
        private router: Router,
        private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.storedProjectTitle = localStorage.getItem('projectTitle') || '';
  }


  saveTitle(): void {
    if (!this.projectTitle) {
      // Show alert if project title is empty
      alert('Project title cannot be empty.');
      return; // Stop execution here if project title is empty
    }



    localStorage.setItem('projectTitle', this.projectTitle); 
    this.sharedService.setPageName(this.projectTitle);

   // Clear the input field after saving
   this.projectTitle = '';
   
    // Navigate to the usermanagement page
    this.router.navigate(['/main-page/usercomponmentcomp']);
  }
 

  cancel(){
    this.router.navigate(['/main-page/usercomponmentcomp']); 
   }
   

} 