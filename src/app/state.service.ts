import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DATA } from './data';
import * as moment from 'moment';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  horarios: any[] = [];
  dataFiltrada$: BehaviorSubject<any[]>;
  
  horasAcademicas : any[] = []
  diasAcademicos: any [] = [];
  
  constructor(private util:Util) {
    this.horasAcademicas = this.util.getHorasAcademicas();
    this.diasAcademicos = this.util.getDiasAcademicos();
    
    this.initCursos();
    
    this.dataFiltrada$ = new BehaviorSubject(this.horarios);
  }

  saveLocalStorage(){
    let idsCursoGrupo : any[]= []
    this.horarios.forEach((anioCursos) => {
      anioCursos.cursos.forEach((curso:any) => {
        curso.grupos.forEach((cursoGrupo: any) => {
           if(cursoGrupo.estado){
             idsCursoGrupo.push(cursoGrupo.id);
           } 
        });
        curso.grupos2.forEach((cursoGrupo: any) => {
          if(cursoGrupo.estado){
            idsCursoGrupo.push(cursoGrupo.id);
          } 
       });
      });
    })
    localStorage.setItem('miHorario',JSON.stringify(idsCursoGrupo));
  }


  initCursos(){
    let data = this.util.fakerHorariosData();

    let miHorario:any = localStorage.getItem("miHorario");
    
    miHorario = JSON.parse(miHorario);
    
    data.forEach((anioCursos) => {

      let cursos = anioCursos.cursos;
      cursos.forEach((curso:any) => {
          curso.grupos.forEach((cursoGrupo: any) => {
            cursoGrupo.parent = curso;
            cursoGrupo.id = curso.cursoNombre + "-" + cursoGrupo.grupo;
            cursoGrupo.abreviatura = curso.abreviatura+ "-" + cursoGrupo.grupo;
            if(miHorario.some((item:any) => item == cursoGrupo.id)){
              cursoGrupo.estado = true;
          }}
          );
          curso.grupos2.forEach((cursoGrupo: any) => {
            cursoGrupo.parent = curso;
            cursoGrupo.id = curso.cursoNombre + "-(L)" + cursoGrupo.grupo;
            cursoGrupo.abreviatura = curso.abreviatura+ "-" + cursoGrupo.grupo+"(L)";
            cursoGrupo.isLab = true;
            if(miHorario.some((item:any) => item == cursoGrupo.id)){
              cursoGrupo.estado = true;
          }}
          );
      });
    });
    this.horarios = data;
    
  }
  
  filtrar() {

    let dataFiltrada: any[] = [];
    this.horarios.forEach(anioCursos => {
      let cursos = anioCursos.cursos.filter((curso: any) => curso.selected == true);
      if (cursos.length > 0) {
        dataFiltrada.push({
          ...anioCursos,
          cursos: cursos
        });
      }
    });
    if(dataFiltrada.length == 0) {
      dataFiltrada = this.horarios;
    }
      this.dataFiltrada$.next(dataFiltrada);
    
    
  }
  tablero(anioCursos: any) {
    return this.util.tableroHorario(anioCursos);
  }
 
}

