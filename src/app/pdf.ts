
import { ThrowStmt } from '@angular/compiler';

import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Injectable } from '@angular/core';
import { AnioHorario, Grupo } from './models/modelos';
import { Util } from './util';
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';

@Injectable({ providedIn: 'root' })
export class PDF {
  private horas;
  private dias;
  constructor(private util: Util) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    this.dias = this.util.getDiasAcademicos();
    this.horas = this.util.getHorasAcademicas();

  }
  generarPdf(horarios: AnioHorario[]) {
    let docDefinition = this.contenidoHorario(horarios);
    return pdfMake.createPdf(docDefinition);
  }

  private contenidoHorario(horarios: AnioHorario[]) {
    let dd: TDocumentDefinitions = {
      pageMargins: [30, 40, 30, 40],
      info: this.metadata(),
      content: [
        { text: 'Horario Académico', style: 'header' },
        'Horario 2021-A',
        {
          style: 'table',
          table: {
            widths: [55, '*', '*', '*', '*', '*'],
            body: this.body(horarios),
          },
          alignment: 'center',
          layout: this.styleTableStriped(),
        }, this.miLeyenda(horarios)],
      styles: this.stylesPdf(),
      defaultStyle: {
        // alignment: 'justify'
      }
    };
    return dd;
  }
  private header() {
    let rowHeader = [];
    rowHeader.push({ text: 'Hora', style: 'tableHeader' });

    this.dias.forEach(dia => {
      rowHeader.push({ text: dia, style: 'tableHeader' });
    })
    return rowHeader;
  }

  private cell(grupos: Grupo[]) {
    let text: any = [];
    grupos.forEach(grupo => {
      if (grupo.isLab)
        text.push({ text: grupo.abreviatura + " ", style: 'laboratorio' });
      else { text.push(grupo.abreviatura + " ") }
    });
    return text;
  }

  private body(horarios: AnioHorario[]) {
    let tableroHorario = this.util.miHorarioTablero(horarios);
    let body = [];
    body.push(this.header());


    for (let i = 0; i < tableroHorario.length; i++) {
      let row = [];
      row.push({ text: this.horas[i].inicio + " - " + this.horas[i].fin, style: 'hora' });
      for (let j = 0; j < tableroHorario[i].length; j++) {
        let grupos = tableroHorario[i][j];
        let text = this.cell(grupos);
        row.push({
          text: text
        });
      }
      body.push(row);
    }

    return body;
  }

  private miLeyenda(horarios: AnioHorario[]) {
    let miLeyenda = this.util.miLeyenda(horarios);
    let leyenda: any[] = [];
    miLeyenda.forEach(curso => {
      let text = curso.abreviatura + "=" + curso.nombre;
      if (curso.teoria.length > 0) {
        text += " (T)(" + curso.teoria.join(',') + ")";
      }
      if (curso.laboratorio.length > 0) {
        text += " (L)(" + curso.laboratorio.join(',') + ")";
      }
      leyenda.push({ text: text, style: 'leyenda' });
    });
    return leyenda;
  }

  private metadata() {
    return {
      title: 'Mi horario',
      author: 'anonimo',
      subject: 'Horario Académico',
      keywords: 'Horario, Año Académico',
    };
  }

  private styleTableStriped() {
    let color = '#CCCCCC'
    return {
      fillColor: (rowIndex: any, node: any, columnIndex: any) => {
        return (rowIndex % 2 === 0) ? color : null;
      }
    }
  }

  private stylesPdf(): StyleDictionary {
    return {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 10]
      },
      table: {
        margin: [0, 5, 0, 15],
        fontSize: 10
      },
      tableHeader: {
        bold: true,
        fontSize: 11,
        color: 'black'
      }, laboratorio: {
        color: 'red',
      },
      hora: {
        fontSize: 9,
      }, leyenda: {
        fontSize: 10
      }
    };
  }


}