import { Component, OnInit } from '@angular/core';
import { AnioHorario } from '../models/modelos';
import { StateService } from '../state.service';
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  horarios: AnioHorario[] = [];
  constructor(private service: StateService){
  }
  ngOnInit(){
    this.horarios = this.service.horarios;
  }
}
