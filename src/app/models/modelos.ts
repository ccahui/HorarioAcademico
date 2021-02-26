export interface AnioHorario{
    nombre:string;
    cursos: Curso[];
}

export interface Curso{
    nombre:string;
    abreviatura: string;
    gruposTeoria: Grupo[];
    gruposLaboratorio: Grupo[];
    filtrado?:boolean;
}

export interface Grupo{
    id: string;
    nombre:string;
    abreviatura:string;
    horas: HoraDia[];
    refParent: Curso;
    seleccionado?: boolean;
    isLab?:boolean;
}


export interface Hora{
    inicio: string;
    fin: string;
}

export interface HoraDia extends Hora {
    dia: string;
}
