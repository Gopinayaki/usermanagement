import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-devexpress',
  templateUrl: './devexpress.page.html',
  styleUrls: ['./devexpress.page.scss'],
})
export class DevexpressPage implements OnInit {
  selectedUsername!: string;
  groupNames: string[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    
 
  }



}
