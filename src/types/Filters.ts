export interface Filter {
    id: string;
    nome: string;
    status: 'DESAPARECIDO' | 'LOCALIZADO';
    sexo : 'MASCULINO' | 'FEMININO';
    pagina : number;
    porPagina : number;
}