
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment';
import { DATA } from './data';

export class Util {
  private horas : any[];
  private diasAbreviados : any[]
  private dias : any [];
  
  constructor(){
    this.horas = this.initHorasAcademicas();
    this.diasAbreviados = this.initDiasAcademicosAbreviados();
    this.dias = this.initDiasAcademicos();
  }
  getDias(){
    return this.dias
  }
  getHorasAcademicas(){
    return this.horas;
  }
  getDiasAbreviados(){
    return this.diasAbreviados;
  }
  fakerHorariosData() {
    let horarios = DATA.map((anioCursos) => {
    
      let cursos = anioCursos.cursos.map((curso: any) => {
        return {
          cursoNombre: curso,
          selected: false,
          abreviatura: curso.substr(0, 3),
          grupos: [
            { grupo: 'A', ...this.randomHoraDia(), horas: [this.randomHoraDia(), this.randomHoraDia()], abreviatura: curso.substr(0, 3) + "-" + "A", id: curso + "-" + "A" },
            { grupo: 'B', ...this.randomHoraDia(), horas: [this.randomHoraDia(), this.randomHoraDia()], abreviatura: curso.substr(0, 3) + "-" + "B", id: curso + "-" + "B" }
          ]
        };
      });
      return {
        anio: anioCursos.nombre,
        cursos: cursos
      }
    });
    return horarios;
  }
  tableroHorario(anioCursos: any) {
    let arrayBidimensional = this.initArray();
    anioCursos.cursos.map((curso: any) => {
      curso.grupos.map((grupoCurso: any) => {
        grupoCurso.horas.map((grupoHora: any) => {
          this.mapear(grupoHora, grupoCurso, arrayBidimensional);
        });
      })
    });
    return arrayBidimensional;
  }

  private initHorasAcademicas() {
    let horas: any[] = [];
    this.horasAcademicas7am_1y20pm(horas);
    this.horasAcademicas2pm_8y20pm(horas);

    return horas;
  }

  private initDiasAcademicosAbreviados() {
    let dias = ["L", "M", "MI", "J", "V"];
    return dias;
  }

  private initDiasAcademicos() {
    let dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
    return dias;
  }

  private horasAcademicas7am_1y20pm(horas: any[]) {
    let format = "HH:mm a";
    let hora = (moment("7:00 am", "HH:mm a"));

    for (let i = 0; i < 7; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(format);
      hora.add(50, 'minutes');
      let fin = hora.format(format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private horasAcademicas2pm_8y20pm(horas: any[]) {
    let format = "HH:mm a";
    let hora = (moment("14:00 pm", "HH:mm a"));

    for (let i = 0; i < 7; i++) {
      if (i != 0 && i % 2 == 0) {
        hora.add(10, 'minutes');
      }
      let inicio = hora.format(format);
      hora.add(50, 'minutes');
      let fin = hora.format(format);
      horas.push(
        { inicio: inicio, fin: fin }
      );
    }
  }

  private randomHoraDia() {
    let horaObj = this.horaAcademicaAleatorio();
    let dia = this.diaAcademicAleatorio()
    
    let inicio = horaObj.inicio;
    if (horaObj.inicio == "12:30 pm") {
      inicio = "7:00 am";
    }

    let format = "HH:mm a";
    let hora = (moment(inicio, format));
    hora.add('100', 'minutes');
    let fin = hora.format(format);

    return {
      inicio: inicio, fin: fin, dia: dia
    }
  }

  private horaAcademicaAleatorio(){
    return this.horas[Math.floor(Math.random() * (this.horas.length - 2))];
  }
  private diaAcademicAleatorio(){
    return this.dias[Math.floor(Math.random() * (this.dias.length))];
  }

  private initArray() {
    let arrayBidimensional = new Array(14);
    for (let i = 0; i < 14; i++) {
      arrayBidimensional[i] = new Array(5);
    }
    for (let i = 0; i < 14; i++) {
      for (let j = 0; j < 5; j++) {
        arrayBidimensional[i][j] = [];
      }
    }
    return arrayBidimensional;
  }

 

  private mapear(grupoHora: any, grupoCurso: any, arrayBidimensional: any) {
    let j = this.dias.findIndex((hora: any) => hora == grupoHora.dia);
    let arrayI = this.mapearHora(grupoHora);
    arrayI.forEach(i => {
      arrayBidimensional[i][j].push(grupoCurso);
    });
  }

  private mapearHora(grupoHora: any) {

    let inicio = grupoHora.inicio;
    let fin = grupoHora.fin;

    let arrayI = [];

    let firstI = this.horas.findIndex((horaObject: any) => {
      return this.between(inicio, fin, horaObject.inicio);
    });
    arrayI.push(firstI);
    for (let i = firstI + 1; i < this.horas.length; i++) {
      let rpta = this.between(inicio, fin, this.horas[i].inicio);
      if (rpta) {
        arrayI.push(i);
      }
    }
    return arrayI;
  }

  private between(inicio: any, fin: any, hora: any) {
    let format = 'HH:mm a';
    let time = moment(hora, format);
    let beforeTime = moment(inicio, format);
    let afterTime = moment(fin, format);

    let rpta = time.isBetween(beforeTime, afterTime) || time.isSame(beforeTime);
    return rpta;
  }


}

