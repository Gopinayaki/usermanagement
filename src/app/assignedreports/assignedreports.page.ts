import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assignedreports',
  templateUrl: './assignedreports.page.html',
  styleUrls: ['./assignedreports.page.scss'],
})
export class AssignedreportsPage implements OnInit {

  constructor( public dailogRef: MatDialogRef<AssignedreportsPage>) { }

  ngOnInit() {
  }

  dismiss() {
    this.dailogRef.close();
  }


}
