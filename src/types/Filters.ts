export interface IFilter {
    id: string;
    name: string;
    status: 'DESAPARECIDO' | 'LOCALIZADO';
    sexo : 'MASCULINO' | 'FEMININO';
    pagina : number;
    porPagina : number;
}