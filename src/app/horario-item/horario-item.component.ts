import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';

@Component({
  selector: 'app-horario-item',
  templateUrl: './horario-item.component.html',
  styleUrls: ['./horario-item.component.css']
})
export class HorarioItemComponent implements OnInit {

  @Input() horarioItem: any; 
  tableroHorario:any;
  hoverElement = "";

  horasAcademicas : any[] = [];
  diasAcademicos : any[] = [];
  constructor(public service: StateService) { }

  ngOnInit(): void {
    this.horasAcademicas = this.service.horasAcademicas;
    this.diasAcademicos = this.service.diasAcademicos;
    this.tableroHorario = this.service.tablero(this.horarioItem); 
    console.log(this.horarioItem);
  } 
  
  save(cursoGrupo:any){
    cursoGrupo.parent.grupos.forEach((element : any)=> {
      if(element == cursoGrupo){
        cursoGrupo.estado = !cursoGrupo.estado;
      }  else {
        element.estado = false;
      }
    });
  }


  


}

