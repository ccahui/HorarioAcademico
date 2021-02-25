import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DATA } from './data';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  horarios: any[] = [];
  dataFiltrada$: BehaviorSubject<any[]>;
  horas : any[] = []
  dias: any[] = ["L", "M", "MI", "J", "V"];
  constructor() {
   
    this.initHora();
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
      });
    })
    localStorage.setItem('miHorario',JSON.stringify(idsCursoGrupo));
  }


  initCursos(){
    let miHorario:any = localStorage.getItem("miHorario");
    miHorario = JSON.parse(miHorario);
    
    this.horarios = DATA.map((anioCursos) => {

      let cursos = anioCursos.cursos.map((curso: any) => {
        return {
          cursoNombre: curso,
          selected: false,
          abreviatura: curso.substr(0,3),
          grupos: [
            { grupo: 'A',...this.randomHora(), horas : [this.randomHora(), this.randomHora()],abreviatura: curso.substr(0,3)+"-"+"A",  id: curso+"-"+"A" },
            { grupo: 'B',...this.randomHora(), horas: [this.randomHora(), this.randomHora()], abreviatura: curso.substr(0,3)+"-"+"B" ,  id: curso+"-"+"B" }
          ]
        };
      });
      cursos.forEach((curso:any) => {
          curso.grupos.forEach((cursoGrupo: any) => {
            cursoGrupo.parent = curso;
            if(miHorario.some((item:any) => item == cursoGrupo.id)){
              cursoGrupo.estado = true;
            
          }}
          );
      });
      return {
        anio: anioCursos.nombre,
        cursos: cursos
      }
    });
  }
  randomHora(){
    let sample = this.horas[Math.floor(Math.random() * (this.horas.length-2))];
    const dia = this.dias[Math.floor(Math.random() * (this.dias.length))];
    let inicioH = sample.inicio;
    if(sample.inicio == "12:30 pm") {
      inicioH = "7:00 am";
    }
    let format = "HH:mm a";
    let horaM = (moment(inicioH, "HH:mm a"));
    let inicio = horaM.format(format);  
      horaM.add('100', 'minutes');
      let fin = horaM.format(format);
      return {
        inicio: inicio, fin: fin, dia: dia 
      }
  }
  
  initHora(){

    let format = "HH:mm a";
   let horaM = (moment("7:00 am", "HH:mm a"));
   
   for(let i = 0; i < 7 ; i++){
    if(i !=0 && i % 2 == 0){
      horaM.add(10, 'minutes');
    }  
    let inicio = horaM.format(format);  
      horaM.add(50, 'minutes');
      let fin = horaM.format(format);
      this.horas.push(
        { inicio : inicio, fin: fin }
      );
      
    }

    horaM = (moment("14:00 pm", "HH:mm a"));
    for(let i = 0; i < 7 ; i++){
      if(i!=-0 && i % 2 == 0){
        horaM.add(10, 'minutes');
      }
      let inicio = horaM.format(format);  
      horaM.add(50, 'minutes');
      let fin = horaM.format(format);
      this.horas.push(
        { inicio : inicio, fin: fin }
      );
      
    }
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

  private initArray() {
    let arrayBidimensional = new Array(14);
    for (let i = 0; i < 14; i++) {
      arrayBidimensional[i] = new Array(5);
    }
    for(let i = 0; i < 14; i++){
      for(let j = 0; j < 5; j++){
        arrayBidimensional[i][j] = [];
      }
    }
    return arrayBidimensional;
  }

  tablero(anioCursos:any){
    let arrayBidimensional = this.initArray();
    
      anioCursos.cursos.map((curso: any) => { 
        curso.grupos.map((grupoCurso: any) =>{
        
          grupoCurso.horas.map((grupoHora:any)=>{
            this.mapear(grupoHora, grupoCurso, arrayBidimensional);
          });
        })
      });
    return arrayBidimensional;
  }
  private mapear(grupo:any, grupoCurso:any, arrayBidimensional:any){
    let j = this.dias.findIndex((hora:any) => hora == grupo.dia);
    let arrayI = this.mapearHora(grupo);
    arrayI.forEach(i=>{
      if(arrayBidimensional[i][j] == null) {
        arrayBidimensional[i][j] = [];
      } 
        arrayBidimensional[i][j].push(grupoCurso);
    });
  }  

  mapearHora(grupo:any){

    let inicio = grupo.inicio;
    let fin = grupo.fin;

    let arrayI = [];
    
    let firstI = this.horas.findIndex((horaObject:any) => {
      return this.between( inicio, fin, horaObject.inicio);
    });
    arrayI.push(firstI);
    for(let i = firstI+1; i< this.horas.length; i++){
      let rpta = this.between( inicio, fin, this.horas[i].inicio);
      if(rpta){
        arrayI.push(i);
      }
    }
    

    return arrayI;
  }

  private between(inicio:any, fin:any, hora:any){
    let format = 'HH:mm a';
    let time   = moment(hora,format);
    let beforeTime = moment(inicio, format);
    let afterTime = moment(fin, format);
    
    let rpta = time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime);
    return rpta;
  }





}

