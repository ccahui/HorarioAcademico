import { HoraDia } from "./modelos";

export interface InputAnioHorario{
    nombre:string;
    cursos: InputCurso[];
}

export interface InputCurso{
    nombre:string;
    abreviatura: string;
    gruposTeoria: InputGrupo[];
    gruposLaboratorio?: InputGrupo[];
}

export interface InputGrupo{
    nombre:string;
    horas: HoraDia[];
}


