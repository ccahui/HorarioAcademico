import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
//import data from './data.json';
import { DATA } from "./data";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularTourHeroes';
  
  constructor(){
  }
}
