import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role:any;

  constructor() { }

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
    //console.log(this.role);
  }

}
