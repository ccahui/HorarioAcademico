
import { ThrowStmt } from '@angular/compiler';
import jspdf, { jsPDF } from 'jspdf';
//import * as pdfMake from 'pdfmake/build/pdfMake';
//import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Injectable } from '@angular/core';
import { AnioHorario, Curso, Grupo, Hora, HoraDia } from './models/modelos';
import { Util } from './util';
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import 'jspdf-autotable';
@Injectable({ providedIn: 'root' })
export class PDF {

  private pdf;
  private x = 10;
  private y = 15;
  private marginRight = 10;
  private pageWidth = 210;

  public constructor(private util: Util) {
    this.pdf = new jsPDF();
  }

  private header() {

    this.pdf.setFontSize(16);
    this.pdf.setFont('Helvetica', 'bold');
    this.pdf.text('Horario Académico', this.x, this.y);

    this.saltoLinea(8);

    this.pdf.setFont('Helvetica', 'normal');
    this.pdf.setFontSize(12);
    this.pdf.text('Horario 2020-A', this.x, this.y);
  }

  private saltoLinea(spacing: number) {
    this.y += spacing;
  }

  private headerTable() {
    let header = [['Hora', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']];
    return header;
  }


  private leyenda(horarios: AnioHorario[]) {

    let spacingItem = 4.5;
    this.pdf.setFont('Helvetica', 'normal');
    this.pdf.setFontSize(10);
    this.saltoLinea(3);

    let miLeyenda = this.util.miLeyenda(horarios);

    miLeyenda.forEach(curso => {
      let text = curso.abreviatura + "=" + curso.nombre;
      if (curso.teoria.length > 0) {
        text += " (T)(" + curso.teoria.join(',') + ")";
      }
      if (curso.laboratorio.length > 0) {
        text += " (L)(" + curso.laboratorio.join(',') + ")";
      }
      this.saltoLinea(spacingItem);
      this.textWrap(text);
    });



  }

  textWrap(cadena: string) {
    let withLine = this.pageWidth - 2 * this.x;
    let splitText = this.pdf.splitTextToSize(cadena, withLine);
    let spacing = 4;

    for (let c = 0, stlength = splitText.length; c < stlength; c++) {
      this.pdf.text(splitText[c], 10, this.y);
      if (stlength != 1 && c < stlength - 1)
        this.saltoLinea(spacing)
    }
  }
  private tableBody(horarios: AnioHorario[]) {
    
        let tableroHorario = this.util.miHorarioTablero(horarios);
        let body = [];
        let horas = this.util.getHorasAcademicas();
        for (let i = 0; i < tableroHorario.length; i++) {
          let row = [];
          row.push(`${horas[i].inicio} - ${horas[i].fin}`);
        
          for (let j = 0; j < tableroHorario[i].length; j++) {
            let grupos = tableroHorario[i][j];
           let text = this.cell(grupos);
            row.push(text);
            
          }
          body.push(row);
        }

    return body;
  }
  private cell(grupos: Grupo[]) {
    let text = ""
    grupos.forEach(grupo => {
      text+=grupo.abreviatura+"  ";
    });
    return text;
  }


  generarPdf(horarios: AnioHorario[]) {


    this.header();
    this.saltoLinea(5);
    (this.pdf as any).autoTable({
      head: this.headerTable(),
      body: this.tableBody(horarios),
      theme: 'grid',
      bodyStyles: { lineColor: [0, 0, 0] },
      headStyles: { lineColor: [0, 0, 0], fontSize: 10.5 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' },
        4: { cellWidth: 'auto' },
        5: { cellWidth: 'auto' },
      }, margin: { left: this.x, right: this.marginRight, top: this.y },
      styles: {
        fontSize: 10,
        cellPadding: 1,
        lineColor: [0, 0, 0],
        halign: 'center',
        valign: 'middle',
        lineWidth: 0.2,
        textColor: [0, 0, 0],

      },
      didParseCell: (cell: any, data: any) => {
        //  console.log(cell);
        //cell.cell.styles.fontStyle='bold';
        //  cell.cell.styles.textColor = [255,0,0];
        if (cell.section == "head") {
          cell.cell.styles.fillColor = [204, 204, 204];
        }
        if (cell.row.index != 0 && cell.row.index % 2 == 1) {
          cell.cell.styles.fillColor = [204, 204, 204];
        }

      },
    })


    this.y = (this.pdf as any).lastAutoTable.finalY;

    this.leyenda(horarios);


    this.pdf.setProperties({
      title: "MiHorario"
    })

    window.open(URL.createObjectURL(this.pdf.output("blob")));
  }


  /*private horas!;
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

*/
}