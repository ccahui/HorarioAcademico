import { Component, OnInit } from '@angular/core';
import { DATA } from '../data';
import { StateService } from '../state.service';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  horarios: any[] = [];
  constructor(private service: StateService){
  }
  ngOnInit(){
    this.horarios = this.service.horarios;
  }
}
