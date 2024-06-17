import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customadd',
  templateUrl: './customadd.page.html',
  styleUrls: ['./customadd.page.scss'],
})
export class CustomaddPage implements OnInit {

  levelchilds: any = {}; // Initialize the levelchilds object  
  levelslookup: any[] = [];  





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dailogRef: MatDialogRef<CustomaddPage>,



  ) { }

  ngOnInit() {
  }


  onSave() {
    // Add your save logic here
    console.log('Save button clicked');
    console.log('Form data:', this.levelchilds); // Log form data for testing
  }

  onCancel() {
    // Add your cancel logic here
    console.log('Cancel button clicked');
    // Optionally, reset the form data
    this.levelchilds = {};
  }


}