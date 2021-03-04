
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment';
import * as DATA from './data.json';

import { Injectable } from '@angular/core';
import {  HoraDia } from './models/modelos';
import { InputAnioHorario, InputCurso, } from './models/inputModels';
import { Util } from './util';
@Injectable({ providedIn: 'root' })

export class FakerHorario {
  private horas;
  private diasAbreviados;

  constructor(private util: Util) {
    this.horas = util.getHorasAcademicas();
    this.diasAbreviados = util.getDiasAbreviados();
  }

  generarHorario() {

    let data = (DATA as any).default;
    let horarios: InputAnioHorario[] = data.map((anioCursos: any) => {

      let cursos: InputCurso[] = anioCursos.cursos.map((curso: string) => {
        return {
          nombre: curso,
          abreviatura: curso.substr(0, 3).toUpperCase(),
          gruposTeoria: [
            `A;${this.randomHoraDia()};${this.randomHoraDia()}`,
            `B;${this.randomHoraDia()};${this.randomHoraDia()}`
          ],
          gruposLaboratorio: [
            `A;${this.randomHoraDia()};${this.randomHoraDia()}`,
            `B;${this.randomHoraDia()};${this.randomHoraDia()}`
          ]
        };
      });
      return {
        nombre: anioCursos.nombre,
        cursos: cursos
      }
    });
    return horarios;
  }

  private randomHoraDia() {
    let horaObj = this.horaAcademicaAleatorio();
    let dia = this.diaAcademicAleatorio()

    let inicio = horaObj.inicio;
    if (horaObj.inicio == "12:30") {
      inicio = "7:00";
    }

    let format = "HH:mm";
    let hora = (moment(inicio, format));
    hora.add('100', 'minutes');
    let fin = hora.format(format);

    return `${dia}-${inicio}-${fin}`;
  }

  private horaAcademicaAleatorio() {
    return this.horas[Math.floor(Math.random() * (this.horas.length - 2))];
  }
  private diaAcademicAleatorio() {
    return this.diasAbreviados[Math.floor(Math.random() * (this.diasAbreviados.length))];
  }

}