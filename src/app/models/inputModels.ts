import { HoraDia } from "./modelos";

export interface InputAnioHorario{
    nombre:string;
    cursos: InputCurso[];
}

export interface InputCurso{
    nombre:string;
    abreviatura: string;
    gruposTeoria: string[];  //Ver Ejemplos
    gruposLaboratorio?: string[]; //Ver Ejemplos
}
/**
 Ejemplo#1 Matematica Basica
 - Grupo A toca los lunes de 7 a 9 y los viernes de las 14 hasta 15:40.
 - Grupo B toca los martes de 9 a 11 y los miercoes de las 7 hasta 9.
 
 gruposTeoria:[
   "A;L-7:00-9:00;V-14:00-15:40",
   "B;M-9:00-11:00;MI-7:00-9:00",  
 ]; 

 Ejemplo#2 Fundamentos de Programacion
 - Grupo A toca los lunes de 7 a 9 
 - Grupo B toca los martes de 9 a 11
 
 gruposLaboratorio:[
   "A;L-7:00-9:00,
   "B;M-9:00-11:00  
 ]; */



