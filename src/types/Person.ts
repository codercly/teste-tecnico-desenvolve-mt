// Interface para detalhes da ocorrência
interface OcorrenciaEntrevDesapDTO {
	informacao: string | null;
	vestimentasDesaparecido: string;
}

// Interface para a última ocorrência
interface UltimaOcorrencia {
	dtDesaparecimento: string;
	dataLocalizacao: string | null;	
	encontradoVivo: boolean;
	localDesaparecimentoConcat: string;
	ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDTO;
	ocoId: number;
}

// Interface para cada pessoa desaparecida
export interface IPessoaDesaparecida {
	id: number;
	nome: string;
	idade: number;
	sexo: "MASCULINO" | "FEMININO";
	vivo: boolean;
	urlFoto: string | null;
	ultimaOcorrencia: UltimaOcorrencia;
}


export interface IAditionalInfo {
	informacao: string;
	descricao: string;
	data: string;
	files?: FileList;
	ocoId: number
}

