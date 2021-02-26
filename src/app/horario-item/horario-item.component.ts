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
    
    console.log(cursoGrupo.parent);
    let cursoGrupos = cursoGrupo.isLab ? cursoGrupo.parent.grupos2 : cursoGrupo.parent.grupos;
    
    cursoGrupos.forEach((element : any)=> {
      if(element == cursoGrupo){
        cursoGrupo.estado = !cursoGrupo.estado;
      }  else {
        element.estado = false;
      }
    });
  }

  printGrupos(cursoGrupos:any){
    let cadena = "";
    if(cursoGrupos.length > 0){
      cadena += "(";
      for(let i = 0; i < cursoGrupos.length; i++){
        cadena+=cursoGrupos[i].grupo;
        if(i < cursoGrupos.length-1){
          cadena+=", ";
        }
      }
      cadena+= ")"
    }
    return cadena;
  }

  


}

