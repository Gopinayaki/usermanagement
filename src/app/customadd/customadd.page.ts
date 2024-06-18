import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-customadd',
  templateUrl: './customadd.page.html',
  styleUrls: ['./customadd.page.scss'],
})
export class CustomaddPage  {

  levelchilds: any = {}; // Initialize the levelchilds object  
  levelslookup: any[] = [];  

  levelname: any;
  levelstructure: any;

  @Input() data: any;

  constructor(
    private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.levelslookup = this.data.map((e:any)=>e.levels);
    
    console.log("datas", this.levelslookup);
  }

  generateUniqueId() {
    // Use a method to generate a unique identifier, for example, using the current timestamp and a random number
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  
  onSave() {
    // Add your save logic here
    console.log('Save button clicked');
    
    const storedDetailstable = localStorage.getItem('Detailstable');
    const arr = storedDetailstable ? JSON.parse(storedDetailstable) : [];
  
    // Generate a new unique ID
    const newId = this.generateUniqueId();
  
    // Create a new object with the generated ID and the form data
    const obj = {
      id: newId,
      levels: this.levelname,
      levelstructure: this.levelstructure,
      __KEY__: newId
    };
  
    // Add the new object to the array
    arr.push(obj);
  
    // Log the form data
    console.log('Form data:', arr, obj);
  
    // Update the localStorage with the new array
    localStorage.setItem('Detailstable', JSON.stringify(arr));
    this.closeModal();

  }
  onCancel() {
    console.log('Cancel button clicked');
    this.closeModal();
  }

  closeModal() {
    this.modalController.dismiss();
  }
  // detailstable() {
  //   localStorage.setItem('Detailstable', JSON.stringify(this.tasksData1));
  // }
}