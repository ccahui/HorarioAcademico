import { Component, Input, OnInit } from '@angular/core';

import * as moment from 'moment';
import { Grupo, HoraDia } from '../models/modelos';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() anioSemestre!:string;
  @Input() urlHorarios!:{nombre:string, url:string}[];
  constructor() { }

  ngOnInit(): void {
  
  }
  

}
