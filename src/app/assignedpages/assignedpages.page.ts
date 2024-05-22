import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assignedpages',
  templateUrl: './assignedpages.page.html',
  styleUrls: ['./assignedpages.page.scss'],
})
export class AssignedpagesPage implements OnInit {

  constructor( public dailogRef: MatDialogRef<AssignedpagesPage>) { }

  ngOnInit() {
  }


  dismiss() {
    this.dailogRef.close();
  }



}
