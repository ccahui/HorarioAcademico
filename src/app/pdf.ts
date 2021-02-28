
import { ThrowStmt } from '@angular/compiler';
import * as moment from 'moment';
import * as DATA from './data.json';
import * as pdfMake from 'pdfmake/build/pdfMake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


import { Injectable } from '@angular/core';
import { AnioHorario, Curso, Grupo, Hora, HoraDia } from './models/modelos';
import { InputAnioHorario, InputCurso, InputGrupo } from './models/inputModels';
import { Util } from './util';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
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


    pdfMake.createPdf(docDefinition).open();
  }
  header() {
    let rowHeader = [];
    rowHeader.push({ text: 'Hora', style: 'tableHeader' });

    this.dias.forEach(dia => {
      rowHeader.push({ text: dia, style: 'tableHeader' });
    })
    return rowHeader;
  }
  cell(grupos: Grupo[]){
    let text:any = [];
    grupos.forEach(grupo=>{
      if(grupo.isLab)
        text.push({text: grupo.abreviatura+" ", style:'laboratorio'});
      else { text.push(grupo.abreviatura+" ")}
    });
    return text;
  }
  body(horarios: AnioHorario[]){
    let tableroHorario = this.util.miHorarioTablero(horarios);
    let body = [];
    body.push(this.header());
    

    for(let i=0; i < tableroHorario.length; i++){
      let row = [];
      row.push({ text: this.horas[i].inicio+" - "+this.horas[i].fin, style: 'hora' });
      for(let j = 0; j < tableroHorario[i].length; j++){
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

  miLeyenda(horarios: AnioHorario[]){
    let miLeyenda = this.util.miLeyenda(horarios);
    let leyenda: any[] = [];
    miLeyenda.forEach(curso=>{
      let text = curso.abreviatura+"="+curso.nombre;
      if(curso.teoria.length>0){
        text+=" (T)("+curso.teoria.join(',')+")";
      }
      if(curso.laboratorio.length>0){
        text+=" (L)("+curso.laboratorio.join(',')+")";
      }
      leyenda.push({text: text, style:'leyenda'});
    });
    return leyenda;
  }
  contenidoHorario(horarios: AnioHorario[]) {
    let dd: TDocumentDefinitions = {
      pageMargins: [ 30, 40, 30, 40 ],
      content: [
        { text: 'Horario Académico', style: 'header' },
        'Horario 2021-A',
        {
          style: 'tableExampleLab',
          table: {
            widths: ['auto', '*', '*', '*', '*', '*'],
            body: this.body(horarios),
          },
          alignment: 'center',
          layout: {
            fillColor: (rowIndex: any, node: any, columnIndex: any) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        }, this.miLeyenda(horarios)],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        tableExampleLab: {
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
          fontSize:10
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };
    return dd;
  }


  private contenido() {
    // playground requires you to assign document definition to a variable called dd

    let dd = {
      content: [
        { text: 'Horario Académico', style: 'header' },
        'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
        { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
        'The following table has nothing more than a body array',
        {
          style: 'tableExampleLab',
          table: {
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [{ text: 'Hora', style: 'tableHeader' }, { text: 'Lunes', style: 'tableHeader' }, { text: 'Martes', style: 'tableHeader' }, { text: 'Miercoles', style: 'tableHeader' }, { text: 'Jueves', style: 'tableHeader' }, { text: 'Viernes', style: 'tableHeader' }],
              [{ text: '7:00 am - 8:50 am', style: 'hora' }, 'CVV-A', 'OK?', 'as', 'aa', 'asd'],
              [{ text: '7:00 am - 8:50 am', style: 'hora' }, 'CVV-A', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', { text: 'FP1-A(L)', style: 'laboratorio' }, 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
              ['One value goes here', 'Another o,ne here', 'OK?', 'as', 'aa', 'asd'],
            ]
          },
          layout: {
            fillColor: (rowIndex: any, node: any, columnIndex: any) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },
        { text: 'A simple table with nested elements', style: 'subheader' },
        'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Column 1', 'Column 2', 'Column 3'],
              [
                {
                  stack: [
                    'Let\'s try an unordered list',
                    {
                      ul: [
                        'item 1',
                        'item 2'
                      ]
                    }
                  ]
                },
                [
                  'or a nested table',
                  {
                    table: {
                      body: [
                        ['Col1', 'Col2', 'Col3'],
                        ['1', '2', '3'],
                        ['1', '2', '3']
                      ]
                    },
                  }
                ],
                {
                  text: [
                    'Inlines can be ',
                    { text: 'styled\n', italics: true },
                    { text: 'easily as everywhere else', fontSize: 10 }]
                }
              ]
            ]
          }
        },
        { text: 'Defining column widths', style: 'subheader' },
        'Tables support the same width definitions as standard columns:',
        {
          bold: true,
          ul: [
            'auto',
            'star',
            'fixed value'
          ]
        },
        {
          style: 'tableExample',
          table: {
            widths: [100, '*', 200, '*'],
            body: [
              ['width=100', 'star-sized', 'width=200', 'star-sized'],
              ['fixed-width cells have exactly the specified width', { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }, { text: 'nothing interesting here', italics: true, color: 'gray' }]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto'],
            body: [
              ['This is a star-sized column. The next column over, an auto-sized column, will wrap to accomodate all the text in this cell.', 'I am auto sized.'],
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            widths: ['*', 'auto'],
            body: [
              ['This is a star-sized column. The next column over, an auto-sized column, will not wrap to accomodate all the text in this cell, because it has been given the noWrap style.', { text: 'I am auto sized.', noWrap: true }],
            ]
          }
        },
        { text: 'Defining row heights', style: 'subheader' },
        {
          style: 'tableExample',
          table: {
            heights: [20, 50, 70],
            body: [
              ['row 1 with height 20', 'column B'],
              ['row 2 with height 50', 'column B'],
              ['row 3 with height 70', 'column B']
            ]
          }
        },
        'With same height:',
        {
          style: 'tableExample',
          table: {
            heights: 40,
            body: [
              ['row 1', 'column B'],
              ['row 2', 'column B'],
              ['row 3', 'column B']
            ]
          }
        },
        'With height from function:',
        {
          style: 'tableExample',
          table: {
            heights: (row: any) => {
              return (row + 1) * 25;
            },
            body: [
              ['row 1', 'column B'],
              ['row 2', 'column B'],
              ['row 3', 'column B']
            ]
          }
        },
        { text: 'Column/row spans', pageBreak: 'before', style: 'subheader' },
        'Each cell-element can set a rowSpan or colSpan',
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [200, 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2, alignment: 'center' }, {}, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              [{ text: 'Header 1', style: 'tableHeader', alignment: 'center' }, { text: 'Header 2', style: 'tableHeader', alignment: 'center' }, { text: 'Header 3', style: 'tableHeader', alignment: 'center' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              [{ rowSpan: 3, text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor' }, 'Sample value 2', 'Sample value 3'],
              ['', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', { colSpan: 2, rowSpan: 2, text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time' }, ''],
              ['Sample value 1', '', ''],
            ]
          }
        },
        { text: 'Headers', pageBreak: 'before', style: 'subheader' },
        'You can declare how many rows should be treated as a header. Headers are automatically repeated on the following pages',
        { text: ['It is also possible to set keepWithHeaderRows to make sure there will be no page-break between the header and these rows. Take a look at the document-definition and play with it. If you set it to one, the following table will automatically start on the next page, since there\'s not enough space for the first row to be rendered here'], color: 'gray', italics: true },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            // dontBreakRows: true,
            // keepWithHeaderRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
              ]
            ]
          }
        },
        { text: 'Styling tables', style: 'subheader' },
        'You can provide a custom styler for the table. Currently it supports:',
        {
          ul: [
            'line widths',
            'line colors',
            'cell paddings',
          ]
        },
        'with more options coming soon...\n\npdfmake currently has a few predefined styles (see them on the next page)',
        { text: 'noBorders:', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: 'noBorders'
        },
        { text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: 'headerLineOnly'
        },
        { text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: 'lightHorizontalLines'
        },
        { text: 'but you can provide a custom styler as well', margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: {
            hLineWidth: (i: any, node: any) => {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: (i: any, node: any) => {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: (i: any, node: any) => {
              return (i === 0 || i === node.table.body.length) ? 'black' : 'gray';
            },
            vLineColor: (i: any, node: any) => {
              return (i === 0 || i === node.table.widths.length) ? 'black' : 'gray';
            },
            // hLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // vLineStyle: function (i, node) { return {dash: { length: 10, space: 4 }}; },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (rowIndex, node, columnIndex) { return null; }
          }
        },
        { text: 'zebra style', margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: {
            fillColor: (rowIndex: any, node: any, columnIndex: any) => {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        },
        { text: 'handling fill color opacity...', margin: [0, 20, 0, 8] },
        { text: '... just hardcoding values in the second row', margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              [
                { text: 'Sample value 1', fillOpacity: 0.15, fillColor: 'blue' },
                { text: 'Sample value 2', fillOpacity: 0.60, fillColor: 'blue' },
                { text: 'Sample value 3', fillOpacity: 0.85, fillColor: 'blue' },
              ],
              ['Sample value 1', 'Sample value 2', 'Sample value 3']
            ]
          },
        },
        { text: '... using a custom styler and overriding it in the second row', margin: [0, 20, 0, 8] },
        {
          style: 'tableOpacityExample',
          table: {
            body: [
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              [
                { text: 'Sample value 1', fillOpacity: 0.15 },
                { text: 'Sample value 2', fillOpacity: 0.60 },
                { text: 'Sample value 3', fillOpacity: 0.85 },
              ],
              ['Sample value 1', 'Sample value 2', 'Sample value 3']
            ]
          },
        },
        { text: '... with a function (opacity at 0 means fully transparent, i.e no color)', margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: {
            fillColor: 'blue',
            fillOpacity: (rowIndex: any, node: any, columnIndex: any) => {
              return (rowIndex / 8 + columnIndex / 3);
            }
          }
        },
        { text: 'and can be used dash border', margin: [0, 20, 0, 8] },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3'],
            ]
          },
          layout: {
            hLineWidth: (i: any, node: any) => {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: (i: any, node: any) => {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: (i: any, node: any) => {
              return 'black';
            },
            vLineColor: (i: any, node: any) => {
              return 'black';
            },
            hLineStyle: (i: any, node: any) => {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return { dash: { length: 10, space: 4 } };
            },
            vLineStyle: (i: any, node: any) => {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return { dash: { length: 4 } };
            },
            // paddingLeft: function(i, node) { return 4; },
            // paddingRight: function(i, node) { return 4; },
            // paddingTop: function(i, node) { return 2; },
            // paddingBottom: function(i, node) { return 2; },
            // fillColor: function (i, node) { return null; }
          }
        },
        { text: 'Optional border', fontSize: 14, bold: true, pageBreak: 'before', margin: [0, 0, 0, 8] },
        'Each cell contains an optional border property: an array of 4 booleans for left border, top border, right border, bottom border.',
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  border: [false, true, false, false],
                  fillColor: '#eeeeee',
                  text: 'border:\n[false, true, false, false]'
                },
                {
                  border: [false, false, false, false],
                  fillColor: '#dddddd',
                  text: 'border:\n[false, false, false, false]'
                },
                {
                  border: [true, true, true, true],
                  fillColor: '#eeeeee',
                  text: 'border:\n[true, true, true, true]'
                }
              ],
              [
                {
                  rowSpan: 3,
                  border: [true, true, true, true],
                  fillColor: '#eeeeff',
                  text: 'rowSpan: 3\n\nborder:\n[true, true, true, true]'
                },
                {
                  border: undefined,
                  fillColor: '#eeeeee',
                  text: 'border:\nundefined'
                },
                {
                  border: [true, false, false, false],
                  fillColor: '#dddddd',
                  text: 'border:\n[true, false, false, false]'
                }
              ],
              [
                '',
                {
                  colSpan: 2,
                  border: [true, true, true, true],
                  fillColor: '#eeffee',
                  text: 'colSpan: 2\n\nborder:\n[true, true, true, true]'
                },
                ''
              ],
              [
                '',
                {
                  border: undefined,
                  fillColor: '#eeeeee',
                  text: 'border:\nundefined'
                },
                {
                  border: [false, false, true, true],
                  fillColor: '#dddddd',
                  text: 'border:\n[false, false, true, true]'
                }
              ]
            ]
          },
          layout: {
            defaultBorder: false,
          }
        },
        'For every cell without a border property, whether it has all borders or not is determined by layout.defaultBorder, which is false in the table above and true (by default) in the table below.',
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  border: [false, false, false, false],
                  fillColor: '#eeeeee',
                  text: 'border:\n[false, false, false, false]'
                },
                {
                  fillColor: '#dddddd',
                  text: 'border:\nundefined'
                },
                {
                  fillColor: '#eeeeee',
                  text: 'border:\nundefined'
                },
              ],
              [
                {
                  fillColor: '#dddddd',
                  text: 'border:\nundefined'
                },
                {
                  fillColor: '#eeeeee',
                  text: 'border:\nundefined'
                },
                {
                  border: [true, true, false, false],
                  fillColor: '#dddddd',
                  text: 'border:\n[true, true, false, false]'
                },
              ]
            ]
          }
        },
        'And some other examples with rowSpan/colSpan...',
        {
          style: 'tableExample',
          table: {
            body: [
              [
                '',
                'column 1',
                'column 2',
                'column 3'
              ],
              [
                'row 1',
                {
                  rowSpan: 3,
                  colSpan: 3,
                  border: [true, true, true, true],
                  fillColor: '#cccccc',
                  text: 'rowSpan: 3\ncolSpan: 3\n\nborder:\n[true, true, true, true]'
                },
                '',
                ''
              ],
              [
                'row 2',
                '',
                '',
                ''
              ],
              [
                'row 3',
                '',
                '',
                ''
              ]
            ]
          },
          layout: {
            defaultBorder: false,
          }
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                {
                  colSpan: 3,
                  text: 'colSpan: 3\n\nborder:\n[false, false, false, false]',
                  fillColor: '#eeeeee',
                  border: [false, false, false, false]
                },
                '',
                ''
              ],
              [
                'border:\nundefined',
                'border:\nundefined',
                'border:\nundefined'
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            body: [
              [
                { rowSpan: 3, text: 'rowSpan: 3\n\nborder:\n[false, false, false, false]', fillColor: '#eeeeee', border: [false, false, false, false] },
                'border:\nundefined',
                'border:\nundefined'
              ],
              [
                '',
                'border:\nundefined',
                'border:\nundefined'
              ],
              [
                '',
                'border:\nundefined',
                'border:\nundefined'
              ]
            ]
          }
        },
        { text: 'BorderColor per Cell with Column/row spans', pageBreak: 'before', style: 'subheader' },
        'Each cell-element can set the borderColor (the cell above or left of the current cell has priority',
        {
          style: 'tableExample',
          color: '#444',
          table: {
            widths: [200, 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  text: 'Header with Colspan = 3',
                  style: 'tableHeader',
                  colSpan: 3,
                  borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                  alignment: 'center',
                },
                {},
                {},
              ],
              [
                {
                  text: 'Header 1',
                  style: 'tableHeader',
                  alignment: 'center',
                },
                {
                  text: 'Header 2',
                  style: 'tableHeader',
                  alignment: 'center',
                },
                {
                  text: 'Header 3',
                  style: 'tableHeader',
                  alignment: 'center',
                },
              ],
              [
                'Sample value 1',
                'Sample value 2',
                'Sample value 3',
              ],
              [
                {
                  rowSpan: 3,
                  borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                  text: 'rowSpan set to 3\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor',
                },
                'Sample value 2',
                {
                  text: 'Sample value 3',
                  borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                },
              ],
              [
                '',
                'Sample value 2',
                'Sample value 3',
              ],
              [
                'Sample value 1',
                'Sample value 2',
                'Sample value 3',
              ],
              [
                'Sample value 1',
                {
                  colSpan: 2,
                  rowSpan: 2,
                  borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                  text: 'Both:\nrowSpan and colSpan\ncan be defined at the same time',
                },
                '',
              ],
              [
                'Sample value 1',
                {
                  text: 'a', borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                },
                {
                  text: '',
                  borderColor: ['#ff00ff', '#00ffff', '#ff00ff', '#00ffff'],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableExampleLab: {
          margin: [0, 5, 0, 15],
          fontSize: 10
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: 'blue',
          fillOpacity: 0.3
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
        }
      },
      defaultStyle: {
        // alignment: 'justify'
      }
    };
    return dd;
  }
}